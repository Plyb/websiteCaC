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

    constructor() {
        this.proposalDrawCards = [...ProposalCardList];
        this.eventDrawCards = [...EventCardList];
    }

    private addPlayer(player: Player) {
        const drawnRoleIndex = Math.floor(Math.random() * this.openRoles.length);
        const role = this.openRoles.splice(drawnRoleIndex, 1)[0];
        this.hands.push(new Hand(player, [], role));
    }

    public createHands(players: Player[]) {
        const drawnPlayerIndex = Math.floor(Math.random() * players.length);
        const monarch = players.splice(drawnPlayerIndex, 1)[0];
        this.hands.push(new Hand(monarch, [], "Monarch"))
        this.hands[0].points = 0;

        players.forEach(player => {
            this.addPlayer(player);
        })
    }

    public drawProposal(name: string): Card {
        const drawnCardIndex = Math.floor(Math.random() * this.proposalDrawCards.length);
        const card = this.proposalDrawCards.splice(drawnCardIndex, 1)[0];
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
        const drawnCardIndex = Math.floor(Math.random() * this.eventDrawCards.length);
        const card = this.eventDrawCards.splice(drawnCardIndex, 1)[0];
        this.eventRecycleCards.push(card);
    }

    public shuffleEvents() {
        this.eventDrawCards.push(...this.eventRecycleCards);
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