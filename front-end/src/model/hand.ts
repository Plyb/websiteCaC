import { Card } from "./card";
import { Player } from "./player";

export class Hand {
    public selected: Number | undefined;
    public points: number = 10;
    public readonly role: string = "";

    constructor(public readonly player: Player, public readonly cards: Card[]) {
        
    }
}