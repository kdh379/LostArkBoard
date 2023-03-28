interface GameContentsType {
    CategoryName: string;
    MinItemLevel: number;
    ContentList: ContentType[];
}

interface ContentType {
    ContentsName: string;
    StartTimes: string[];
    RewardItems: RewardItemEntities[];
}

declare type ClosestEventType = {
    CategoryName: string;
    StartTime: string;
    ContentsList: {
        ContentsName: string;
        RewardItems: string[];
    }[];
};
