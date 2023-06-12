interface CollectiblesEntity {
    Type: string;
    Icon: string;
    Point: number;
    MaxPoint: number;
    CollectiblePoints: CollectiblePoint[];
}

interface CollectiblePoint {
    PointName: string;
    Point: number;
    MaxPoint: number;
}
