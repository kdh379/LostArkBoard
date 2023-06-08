interface GameContentsEntity {
    CategoryName: string;
    ContentsIcon: string;
    ContentsName: string;
    Location: string;
    MinItemLevel: number;
    StartTimes: string[];
    RewardItems: RewardItemEntity[];
}

declare type RewardItemEntity = {
    Name: string;
    Icon: string;
    Grade: string;
    StartTimes: string[] | null;
};
