import axios from "axios";
import { Card } from "./card";
import { Game } from "./game";
import { Hand } from "./hand";
import { Player } from "./player";

export class Board {
    constructor(
        public readonly proposalDrawCards: Card[],
        public readonly eventDrawCards: Card[],
        public readonly proposalRecycleCards: Card[],
        public readonly eventRecycleCards: Card[],
        public readonly hands: Hand[],
        public readonly proposedCards: Card[],
        public readonly activeCards: Card[],
    ) {
    }

    public getOtherHands(): Hand[] {
        return this.hands.filter(hand => hand.player.name != Game.instance.playerName);
    }

    public getPlayerHand(): Hand {
        return this.hands.find(hand => hand.player.name === Game.instance.playerName)!;
    }

    public async setReady() {
        await axios.put('/api/board/ready', {player: Game.instance.playerName})
    }

    public getMonarchGoals(): string {
        const otherHands = this.getOtherHands();
        const numGoals = Math.floor(otherHands.length / 2);
        const goalHands = this.randomlySelectHands(otherHands, numGoals);

        return goalHands.reduce((goalsAccumulator: string, hand: Hand) => {
            return goalsAccumulator + this.getGoal(hand) + ", ";
        }, '')
    }

    private randomlySelectHands(hands: Hand[], numberOfHands: number): Hand[] {
        const result = new Array<Hand>(numberOfHands);
        let len = hands.length;
        const taken = new Array(len);
        if (numberOfHands > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (numberOfHands--) {
            const x = Math.floor(Math.random() * len);
            result[numberOfHands] = hands[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    private getGoal(hand: Hand): string {
        const d6 = Math.ceil(Math.random() * 6);
        const d8 = Math.ceil(Math.random() * 8);
        const totalGoal = d6 + d8 + 6;

        return hand.role + ": " + totalGoal;
    }
}