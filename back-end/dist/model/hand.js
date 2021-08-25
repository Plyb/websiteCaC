"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hand = void 0;
class Hand {
    constructor(player, cards, role) {
        this.player = player;
        this.cards = cards;
        this.role = role;
        this.points = 10;
    }
    propose() {
        const proposedCard = this.cards.splice(this.selected, 1)[0];
        this.selected = undefined;
        return proposedCard;
    }
}
exports.Hand = Hand;
//# sourceMappingURL=hand.js.map