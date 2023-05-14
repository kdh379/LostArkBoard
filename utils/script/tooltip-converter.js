const ELIXIR_REGEX =
    /<FONT.*?>(\[(.*?)\])?<\/FONT> (.*?) <FONT.*?>Lv\.(\d)<\/FONT><br>(.*)/;

const ARMOR_SET_REGEX = /(.+) <FONT COLOR='#FFD200'>Lv\.(\d+)<\/FONT>/;

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
export const getElixir = (obj) => {
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
            qualityValue = val.value.qualityValue;
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

export const getQualityValue = (obj) => {
    const data = JSON.parse(obj);

    const qualityValue = data["QualityValue"];

    return qualityValue;
};
