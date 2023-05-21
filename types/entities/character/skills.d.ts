declare type ArmorySkillsEntity = {
    Name: string;
    Icon: string;
    Level: number;
    Type: string;
    IsAwakening: boolean;
    Tripods: Tripod[];
    Rune: Rune | null;
    Tooltip: string;
};

declare type Rune = {
    Name: string;
    Icon: string;
    Grade: string;
    Tooltip: string;
};

declare type Tripod = {
    Tier: number;
    Slot: number;
    Name: string;
    Icon: string;
    Level: number;
    IsSelected: boolean;
    Tooltip: string;
};
