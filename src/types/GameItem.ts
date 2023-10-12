export type Bonus={
    point:number;
    threshold:number;
}
export type GameItem={
    label: string;
    basePoint: number;
    bonus?:Bonus;
    collectCount: number;
    itemScore: number;
}