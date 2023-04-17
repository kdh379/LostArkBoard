declare type NoticeEntities = {
    Title: string;
    Date: string;
    Link: string;
    Type: string;
};

declare type EventEntities = {
    Title: string;
    Thumbnail: string;
    Link: string;
    StartDate: string;
    EndDate: string;
    RewardDate: string;
};

interface GameContentsEntities {
    CategoryName: string;
    ContentsName: string;
    ContentsIcon: string;
    MinItemLevel: number;
    StartTimes: string[];
    Location: string;
    RewardItems: RewardItemEntities[];
}

declare type RewardItemEntities = {
    Name: string;
    Icon: string;
    Grade: string;
    StartTimes: string[];
};

interface ArmoriesEntity {
    ArmoryProfile: ProfilesEntity;
    ArmoryEquipment: ArmoryEquipmentEntity[];
    ArmoryAvatars: ArmoryAvatarsEntity[];
    ArmorySkills: ArmorySkillsEntity[];
    ArmoryEngraving: ArmoryEngravingEntity;
}

declare type User = {
    CharacterImage: string;
    ExpeditionLevel: number;
    PvpGradeName: string;
    TownLevel: number;
    TownName: string;
    Title: string;
    GuildMemberGrade: string;
    GuildName: string;
    ServerName: string;
    CharacterName: string;
    CharacterLevel: number;
    CharacterClassName: string;
    ItemAvgLevel: number;
    ItemMaxLevel: number;
};

declare type ArmoryEngravingEntity = {
    Engravings: EngravingEntity[];
    Effects: Effect[];
};

declare type EngravingEntity = {
    Slot: number;
    Name: string;
    Icon: string;
    Tooltip: string;
};

declare type Effect = {
    Name: string;
    Description: string;
};

declare type ArmorySkillsEntity = {
    Name: string;
    Icon: string;
    Level: number;
    Type: string;
    IsAwakening: boolean;
    Tripods: Tripod[];
    Rune: Rune | null;
    Tooltip: string;
};

declare type Rune = {
    Name: string;
    Icon: string;
    Grade: string;
    Tooltip: string;
};

declare type Tripod = {
    Tier: number;
    Slot: number;
    Name: string;
    Icon: string;
    Level: number;
    IsSelected: boolean;
    Tooltip: string;
};

declare type ArmoryAvatarsEntity = {
    Type: string;
    Name: string;
    Icon: string;
    Grade: string;
    IsSet: boolean;
    IsInner: boolean;
    Tooltip: string;
};

declare type ArmoryEquipmentEntity = {
    Type: string;
    Name: string;
    Icon: string;
    Grade: string;
    Tooltip: string;
};

interface ProfilesEntity extends User {
    UsingSkillPoint: string;
    TotalSkillPoint: string;
    Stats: StatEntity[];
    Tendencies: TendenciesEntity[];
}

declare type StatEntity = {
    Type: string;
    Value: string;
    Tooltip: string[];
};

declare type TendenciesEntity = {
    Type: string;
    Point: number;
    MaxPoint: number;
};
