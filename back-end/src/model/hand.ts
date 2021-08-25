import { Card } from "./card";
import { Player } from "./player";

export class Hand {
    public selected: number | undefined;
    public points: number = 10;

    constructor(
        public readonly player: Player,
        public readonly cards: Card[],
        public role: string
    ) {

    }

    public propose(): Card {
        const proposedCard = this.cards.splice(this.selected, 1)[0];
        this.selected = undefined;
        return proposedCard;
    }
}