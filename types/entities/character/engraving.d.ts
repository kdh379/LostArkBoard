declare type ArmoryEngravingEntity = {
    Engravings: EngravingEntity[];
    Effects: EngravingEffect[];
};

declare type EngravingEntity = {
    Slot: number;
    Name: string;
    Icon: string;
    Tooltip: string;
};

declare type EngravingEffect = {
    Name: string;
    Description: string;
};
