import { atom } from "recoil";

export const avatarAtom = atom<ArmoryAvatarsEntity[]>({
    key: "avatar",
    default: [],
});

export const engravingAtom = atom<ArmoryEngravingEntity>({
    key: "engraving",
    default: {
        Engravings: [],
        Effects: [],
    },
});

export const profileAtom = atom<ProfilesEntity>({
    key: "profile",
    default: {
        CharacterClassName: "",
        CharacterImage: "",
        CharacterLevel: 0,
        CharacterName: "",
        ExpeditionLevel: 0,
        GuildName: "",
        ItemAvgLevel: 0,
        PvpGradeName: "",
        ServerName: "",
        Title: "",
        TownLevel: 0,
        TownName: "",
        GuildMemberGrade: "",
        ItemMaxLevel: 0,
        Stats: [],
        Tendencies: [],
        TotalSkillPoint: "",
        UsingSkillPoint: "",
    },
});

export const equipmentAtom = atom<ArmoryEquipmentEntity[]>({
    key: "equipment",
    default: [],
});

export const skillsAtom = atom<ArmorySkillEntity[]>({
    key: "skills",
    default: [],
});

export const gemsAtom = atom<ArmoryGemEntity>({
    key: "gems",
    default: {
        Gems: [],
        Effects: [],
    },
});

export const cardsAtom = atom<ArmoryCardEntity>({
    key: "cards",
    default: {
        Cards: [],
        Effects: [],
    },
});

export const collectiblesAtom = atom<CollectiblesEntity[]>({
    key: "collectibles",
    default: [],
});
