"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const eventCardList_1 = require("./eventCardList");
const hand_1 = require("./hand");
const proposalCardList_1 = require("./proposalCardList");
class Board {
    constructor() {
        this.proposalRecycleCards = [];
        this.eventRecycleCards = [];
        this.proposedCards = [];
        this.activeCards = [];
        this.hands = [];
        this.openRoles = [
            "Treasurer:\n Money",
            "General:\n Military Advantage",
            "High Priest:\n Religiosity",
            "Chief Judge:\n Legal Integrity",
            "Lord Chamberlain:\n Noble Satisfaction",
            "Jester:\n Peasant Satisfaction",
            "Ambassador:\n Foreign Relations",
            "Quartermaster:\n Food Stockpile",
        ];
        this.proposalDrawCards = [...proposalCardList_1.ProposalCardList];
        this.eventDrawCards = [...eventCardList_1.EventCardList];
    }
    addPlayer(player) {
        const drawnRoleIndex = Math.floor(Math.random() * this.openRoles.length);
        const role = this.openRoles.splice(drawnRoleIndex, 1)[0];
        this.hands.push(new hand_1.Hand(player, [], role));
    }
    createHands(players) {
        const drawnPlayerIndex = Math.floor(Math.random() * players.length);
        const monarch = players.splice(drawnPlayerIndex, 1)[0];
        this.hands.push(new hand_1.Hand(monarch, [], "Monarch"));
        this.hands[0].points = 0;
        players.forEach(player => {
            this.addPlayer(player);
        });
    }
    drawProposal(name) {
        const drawnCardIndex = Math.floor(Math.random() * this.proposalDrawCards.length);
        const card = this.proposalDrawCards.splice(drawnCardIndex, 1)[0];
        this.hands.find(hand => hand.player.name === name).cards.push(card);
        return card;
    }
    setReady(name, index) {
        this.hands.find(hand => hand.player.name === name).selected = index;
    }
    proposeCards() {
        this.proposedCards = [];
        this.hands.forEach(hand => {
            const proposedCard = hand.propose();
            if (proposedCard) {
                this.proposedCards.push(proposedCard);
            }
        });
    }
    discard(index) {
        const discardedCard = this.proposedCards.splice(index, 1)[0];
        this.proposalRecycleCards.push(discardedCard);
    }
    enact(index) {
        const enactedCard = this.proposedCards.splice(index, 1)[0];
        if (enactedCard.ongoing) {
            this.activeCards.push(enactedCard);
        }
    }
    repeal(index) {
        const repealed = this.activeCards.splice(index, 1)[0];
    }
    shuffleProposals() {
        this.proposalDrawCards.push(...this.proposalRecycleCards);
        this.proposalRecycleCards = [];
    }
    drawEventCard() {
        const drawnCardIndex = Math.floor(Math.random() * this.eventDrawCards.length);
        const card = this.eventDrawCards.splice(drawnCardIndex, 1)[0];
        this.eventRecycleCards.push(card);
    }
    shuffleEvents() {
        this.eventDrawCards.push(...this.eventRecycleCards);
        this.eventRecycleCards = [];
    }
    updatePoints(name, points) {
        this.hands.find(hand => hand.player.name === name).points = points;
    }
    swapMonarch(newMonarchName) {
        const oldMonarch = this.hands.find(hand => hand.role === "Monarch");
        const newMonarch = this.hands.find(hand => hand.player.name === newMonarchName);
        oldMonarch.role = newMonarch.role;
        oldMonarch.points = newMonarch.points;
        newMonarch.role = "Monarch";
        newMonarch.points = 0;
    }
}
exports.Board = Board;
//# sourceMappingURL=board.js.map