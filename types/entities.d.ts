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
