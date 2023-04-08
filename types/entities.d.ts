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
