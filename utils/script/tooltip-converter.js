const ELIXIR_REGEX =
    /<FONT.*?>(\[(.*?)\])?<\/FONT> (.*?) <FONT.*?>Lv\.(\d)<\/FONT><br>(.*)/;

const ARMOR_SET_REGEX = /(.+) <FONT COLOR='#FFD200'>Lv\.(\d+)<\/FONT>/;
const COMBAT_STAT_REGEX = /\[(.+?)\].+\+(\d+)/;

const HTML_TAG_REGEX = /<[^>]*>/g;

const getQualityValue = (val) => {
    return val.value.qualityValue;
};

function removeHtmlTags(input) {
    const regex = /<[^>]+>/g;
    return input.replace(regex, "");
}

/**
 *
 * @param {string} obj
 * @returns {{
 * qualityValue: number,
 * armorSet?: {
 * name: string,
 * level: number,
 * }
 * elixir: Array<{
 *  category: string,
 *  name: string,
 *  value: string,
 *  level: number,
 * }>
 * }}
 */
export const parseArmorToolTip = (obj) => {
    const elixir = [];
    let armorSet = {};
    let qualityValue = "";

    const data = JSON.parse(obj);

    Object.values(data).forEach((val) => {
        if (val.type === "IndentStringGroup") {
            const elementList = val.value.Element_000.contentStr;
            const topStr = val.value.Element_000.topStr;

            if (topStr.includes("엘릭서 효과")) {
                // const regexResult = el.match(elixir.regex);
                Object.values(elementList).forEach((el) => {
                    const str = el.contentStr;

                    const [_1, _2, category, name, level, effect] =
                        str.match(ELIXIR_REGEX);

                    elixir.push({
                        category: category,
                        name: name,
                        value: effect,
                        level: level,
                    });
                });
            }
        }

        if (val.type === "ItemTitle") {
            qualityValue = getQualityValue(val);
        }

        if (val.type === "ItemPartBox") {
            const elementList = val.value;

            Object.values(elementList).forEach((el) => {
                if (el.includes("세트 효과 레벨")) {
                    const [_1, name, level] =
                        elementList.Element_001.match(ARMOR_SET_REGEX);
                    armorSet = {
                        name: name,
                        level: level,
                    };
                }
            });
        }
    });

    return {
        qualityValue: qualityValue,
        elixir: elixir,
        armorSet: armorSet,
    };
};

/**
 * @param {string} obj
 * @returns {{
 * qualityValue: number,
 * possibleEffects: Array<{
 *   name: string,
 *   value: string,
 * }>
 * combatStats: Array<{
 *  name: string,
 *  value: string,
 * }>
 * }}
 *
 **/
export const parseAccessoryToolTip = (obj) => {
    let qualityValue = "";
    const possibleEffects = [];
    const combatStats = [];

    const data = JSON.parse(obj);

    Object.values(data).forEach((val) => {
        if (val.type === "ItemTitle") {
            qualityValue = getQualityValue(val);
        } else if (val.type === "ItemPartBox") {
            const elementList = val.value;

            Object.values(elementList).forEach((el) => {
                if (el.includes("추가 효과")) {
                    const matches =
                        elementList.Element_001.toUpperCase().split("<BR>");

                    for (const match of matches) {
                        const [name, value] = match.split(" +");
                        possibleEffects.push({
                            name,
                            value,
                        });
                    }
                }
            });
        } else if (val.type === "IndentStringGroup") {
            const elementList = val.value.Element_000.contentStr;

            Object.values(elementList).forEach((el) => {
                const str = el.contentStr;

                const [_, name, value] = str
                    .split(HTML_TAG_REGEX)
                    .filter(Boolean);

                combatStats.push({
                    name,
                    value: value.replace(/[^0-9]/g, ""),
                });
            });
        }
    });

    return {
        qualityValue,
        possibleEffects,
        combatStats,
    };
};

/**
 * @param {string} obj
 * @returns {{
 * possibleEffects: Array<{
 *   name: string,
 *   value: string,
 * }>
 * specialStats: Array<{
 *  name: string,
 *  value: string,
 *  description: string,
 * }>
 * }}
 *
 **/
export const parseBraceletToolTip = (obj) => {
    const possibleEffects = [];
    const specialStats = [];

    const data = JSON.parse(obj);

    Object.values(data).forEach((val) => {
        if (val.type === "ItemPartBox") {
            const elementList = val.value;

            Object.values(elementList).forEach((el) => {
                if (el.includes("팔찌 효과")) {
                    const splitElements = elementList.Element_001.split("<BR>");

                    const elements = splitElements.map((value) =>
                        removeHtmlTags(value.trim())
                    );

                    for (const element of elements) {
                        if (element.includes("+")) {
                            const [name, value] = element.split("+");

                            possibleEffects.push({
                                name: name.trim(),
                                value: value.trim(),
                            });
                            // [ 문자가 포함되어 있는 경우 다음 [ 문자가 나올 때까지 문자열을 합친다.
                        } else if (element.includes("[")) {
                            const pattern = /\[(.*?)\]\s*(.*)/;
                            const [_, name, value] = element.match(pattern);

                            specialStats.push({
                                name: name.trim(),
                                value: "",
                                description: value.trim(),
                            });
                        } else {
                            specialStats[specialStats.length - 1].description +=
                                element;
                        }
                    }
                }
            });
        }
    });

    specialStats.forEach((stat) => {
        // stat.description 에서 "stat.name :" 과 일치하는 곳 다음에 오는 n% 를 value 로 설정한다.
        const pattern = new RegExp(`${stat.name} :[^%]*\\b(\\d+\\.?\\d*%)`);
        const match = stat.description.match(pattern);

        if (match) {
            stat.value = match[1];
        } else {
            stat.value = stat.description.match(/(\d+(\.\d+)?)%/)[0] ?? "";
        }
    });

    return {
        possibleEffects,
        specialStats,
    };
};
