declare type NoticeEntities = {
    Title: string;
    Date: string;
    Link: string;
    Type: string;
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
