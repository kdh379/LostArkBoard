const engravingIcon = {
    원한: "https://cdn-lostark.iloa.gg/EFUI_IconAtlas/Buff/Buff_71.png",
    "예리한 둔기":
        "https://cdn-lostark.iloa.gg/EFUI_IconAtlas/Achieve/achieve_03_40.png",
    "포격 강화":
        "https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/GL_Skill/GL_Skill_01_26.png",
    "저주받은 인형":
        "https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Buff/Buff_237.png",
    절정: "https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Ability/Ability_207.png",
};

const convertEngraving = (
    engraving: ArmoryEngravingEntity
): EngravingType[] => {
    const { Effects } = engraving;

    const engravingList: EngravingType[] = [];

    // for (const effect of Effects) {
    //     const { Name, Description } = effect;

    //     const icon = engravingIcon[Name];

    return [];
};

declare type EngravingType = {
    name: string;
    icon: string;
    level: number;
};
