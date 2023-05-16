const ELIXIR_REGEX =
    /<FONT.*?>(\[(.*?)\])?<\/FONT> (.*?) <FONT.*?>Lv\.(\d)<\/FONT><br>(.*)/;

const ARMOR_SET_REGEX = /(.+) <FONT COLOR='#FFD200'>Lv\.(\d+)<\/FONT>/;
const COMBAT_STAT_REGEX = /\[(.+?)\].+\+(\d+)/;

const HTML_TAG_REGEX = /<[^>]*>/g;

const getQualityValue = (val) => {
    return val.value.qualityValue;
};

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
