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
    ContentsName: string;
    StartTime: string;
    RewardItems: string[];
};
