interface GameContentsType {
    CategoryName: string;
    Contents: ContentType[];
}

declare type ContentType = {
    ContentsName: string;
    StartTimes: string[];
    RewardItems: string;
};
