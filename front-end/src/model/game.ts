import axios from "axios";
import { Board } from "./board";
import { Player } from "./player";

export class Game {
    public static instance: Game;
    
    private board: Board | undefined;

    constructor(public readonly playerName: string, public allPlayers: Player[]) {}

    public async reloadPlayers(): Promise<Player[]> {
        const res = await axios.get("/api/players");
        this.allPlayers = res.data.players;
        await this.reloadBoard();
        return this.allPlayers;
    }

    public async reloadBoard(): Promise<Board | undefined> {
        const res = await axios.get("/api/board");
        const boardRaw = res.data.board;
        if (boardRaw) {
            this.board = new Board(
                boardRaw.proposalDrawCards, 
                boardRaw.eventDrawCards, 
                boardRaw.proposalRecycleCards, 
                boardRaw.eventRecycleCards, 
                boardRaw.hands,
                boardRaw.proposedCards,
                boardRaw.activeCards,
            )
            return this.board;
        }
    }
}