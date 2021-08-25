import { Board } from "./board";
import { Player } from "./player";

export class Game {
    public static instance: Game;

    public board: Board | undefined;

    constructor(public readonly allPlayers: Player[]) {}

    public addPlayer(player: Player): void {
        this.allPlayers.push(player);
    }

    public startGame() {
        this.board = new Board();
        this.board.createHands(this.allPlayers);
    }
}