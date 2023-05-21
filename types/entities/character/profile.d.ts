interface ProfilesEntity extends User {
    UsingSkillPoint: string;
    TotalSkillPoint: string;
    Stats: StatEntity[] | null;
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

declare type User = {
    CharacterImage: string | null;
    ExpeditionLevel: number;
    PvpGradeName: string | null;
    TownLevel: number | null;
    TownName: string;
    Title: string | null;
    GuildMemberGrade: string | null;
    GuildName: string | null;
    ServerName: string;
    CharacterName: string;
    CharacterLevel: number;
    CharacterClassName: string;
    ItemAvgLevel: number;
    ItemMaxLevel: number;
};
