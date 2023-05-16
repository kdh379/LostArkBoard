interface GameContentsType {
    CategoryName: string;
    MinItemLevel: number;
    ContentList: ContentsType[];
}

interface ContentsType {
    ContentsName: string;
    StartTimes: string[];
    RewardItems: RewardItemEntity[];
}

declare type ClosestEventType = {
    CategoryName: string;
    StartTime: string;
    isClosed: boolean;
    ContentsList: ClosestContentsListType[];
};

declare type ClosestContentsListType = {
    ContentsName: string;
    isNextEvent: boolean;
    RewardItems: string[];
};
