"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const board_1 = require("./board");
class Game {
    constructor(allPlayers) {
        this.allPlayers = allPlayers;
    }
    addPlayer(player) {
        this.allPlayers.push(player);
    }
    startGame() {
        this.board = new board_1.Board();
        this.board.createHands(this.allPlayers);
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map