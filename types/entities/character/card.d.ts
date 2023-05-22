declare type ArmoryCardEntity = {
    Cards: CardEntity[];
    Effects: CardEffectEntity[];
};

declare type CardEntity = {
    Slot: number;
    Name: string;
    Icon: string;
    AwakeCount: number;
    AwakeTotal: number;
    Grade: string;
    Tooltip: string;
};

declare type CardEffectEntity = {
    Index: number;
    CardSlots: number[];
    Items: {
        Name: string;
        Description: string;
    }[];
};
