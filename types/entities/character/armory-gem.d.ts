declare type ArmoryGemEntity = {
    Gems: GemEntity[];
    Effects: GemEffectEntity[];
};

declare type GemEntity = {
    Slot: number;
    Name: string;
    Icon: string;
    Level: number;
    Grade: string;
    Tooltip: string;
};

declare type GemEffectEntity = {
    GemSlot: number;
    Name: string;
    Description: string;
    Icon: string;
    Tooltip: string | null;
};
