interface GameContentsEntity {
    CategoryName: string;
    ContentsName: string;
    ContentsIcon: string;
    MinItemLevel: number;
    StartTimes: string[];
    Location: string;
    RewardItems: RewardItemEntity[];
}

declare type RewardItemEntity = {
    Name: string;
    Icon: string;
    Grade: string;
    StartTimes: string[];
};
