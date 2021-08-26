import { Card } from "./card";
import { EventCardList } from "./eventCardList";
import { Hand } from "./hand";
import { Player } from "./player";
import { ProposalCardList } from "./proposalCardList";

export class Board {
    private proposalDrawCards: Card[]
    private eventDrawCards: Card[]
    private proposalRecycleCards: Card[] = []
    private eventRecycleCards: Card[] = []

    private proposedCards: Card[] = []
    private activeCards: Card[] = []

    private hands: Hand[] = [];

    private openRoles: string[] = [
        "Treasurer:\n Money",
        "General:\n Military Advantage",
        "High Priest:\n Religiosity",
        "Chief Judge:\n Legal Integrity",
        "Lord Chamberlain:\n Noble Satisfaction",
        "Jester:\n Peasant Satisfaction",
        "Ambassador:\n Foreign Relations",
        "Quartermaster:\n Food Stockpile",
    ]

    constructor(players: Player[]) {
        const numProposalCards = (players.length - 1) * 10;

        this.proposalDrawCards = this.randomlyPullCards([...ProposalCardList], numProposalCards);
        this.eventDrawCards = this.randomlyPullCards([...EventCardList], EventCardList.length);

        this.createHands(players);
    }

    private randomlyPullCards(cards: Card[], numberOfCards: number): Card[] {
        const result = new Array<Card>(numberOfCards);
        let len = cards.length;
        const taken = new Array(len);
        if (numberOfCards > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (numberOfCards--) {
            const x = Math.floor(Math.random() * len);
            result[numberOfCards] = cards[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        result.sort((a, b) => Math.random() - 0.5)
        return result;
    }

    private addPlayer(player: Player) {
        const drawnRoleIndex = Math.floor(Math.random() * this.openRoles.length);
        const role = this.openRoles.splice(drawnRoleIndex, 1)[0];
        this.hands.push(new Hand(player, [], role));
    }

    private createHands(players: Player[]) {
        const drawnPlayerIndexMonarch = Math.floor(Math.random() * players.length);
        const monarch = players.splice(drawnPlayerIndexMonarch, 1)[0];
        this.hands.push(new Hand(monarch, [], "Monarch"))
        this.hands[0].points = 0;

        players.forEach(player => {
            this.addPlayer(player);
        })

        const drawnPlayerIndexSpy = Math.floor(Math.random() * players.length);
        const spyPlayer = players[drawnPlayerIndexSpy];
        const spy = this.hands.find(hand => hand.player === spyPlayer);
        spy.isSpy = true;
    }

    public drawProposal(name: string): Card {
        const card = this.proposalDrawCards.pop()
        this.hands.find(hand => hand.player.name === name).cards.push(card);
        return card;
    }

    public setReady(name: string, index: number) {
        this.hands.find(hand => hand.player.name === name).selected = index;
    }

    public proposeCards() {
        this.proposedCards = [];
        this.hands.forEach(hand => {
            const proposedCard = hand.propose();
            if (proposedCard) {
                this.proposedCards.push(proposedCard)
            }
        })
    }

    public discard(index: number) {
        const discardedCard = this.proposedCards.splice(index, 1)[0];
        this.proposalRecycleCards.push(discardedCard);
    }

    public enact(index: number) {
        const enactedCard = this.proposedCards.splice(index, 1)[0];
        if (enactedCard.ongoing) {
            this.activeCards.push(enactedCard)
        }
    }

    public repeal(index: number) {
        const repealed = this.activeCards.splice(index, 1)[0];
    }

    public shuffleProposals() {
        this.proposalDrawCards.push(...this.proposalRecycleCards);
        this.proposalRecycleCards = [];
    }

    public drawEventCard() {
        const card = this.eventDrawCards.pop()
        this.eventRecycleCards.push(card);
    }

    public shuffleEvents() {
        const topRecycleCard = this.eventRecycleCards.pop();
        this.eventDrawCards.push(...this.eventRecycleCards);
        this.eventDrawCards.unshift(topRecycleCard);
        this.eventRecycleCards = [];
    }

    public updatePoints(name: string, points: number) {
        this.hands.find(hand => hand.player.name === name).points = points;
    }

    public swapMonarch(newMonarchName: string) {
        const oldMonarch = this.hands.find(hand => hand.role === "Monarch");
        const newMonarch = this.hands.find(hand => hand.player.name === newMonarchName);
        oldMonarch.role = newMonarch.role
        oldMonarch.points = newMonarch.points
        newMonarch.role = "Monarch"
        newMonarch.points = 0;
    }
}