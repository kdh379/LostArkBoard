const engravingIcon: { [key: string]: string } = {
    "포격 강화":
        "https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/GL_Skill/GL_Skill_01_26.png",
    "저주받은 인형":
        "https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Buff/Buff_237.png",
    절정: "https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_207.png",
};

export const convertEngraving = (
    engraving: ArmoryEngravingEntity
): EngravingType[] => {
    const { Effects, Engravings } = engraving;

    const engravingList: EngravingType[] = [];

    Effects.forEach((effect) => {
        const { Name, Description } = effect;

        const [name, level] = Name.split(" Lv. ");

        engravingList.push({
            name,
            icon:
                engravingIcon[name] ||
                Engravings.find((e) => e.Name === name)?.Icon ||
                engravingIcon["저주받은 인형"],
            level: Number(level),
        });
    });

    return engravingList;
};

declare type EngravingType = {
    name: string;
    icon: string;
    level: number;
};
