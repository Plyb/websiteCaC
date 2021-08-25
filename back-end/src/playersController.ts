import { Game } from './model/game'
import { Player } from './model/player';
import express from "express";

const router = express.Router();

router.get('/', async(req, res) => {
    res.send({players: Game.instance.allPlayers});
})

router.post('/', async(req, res) => {
    const player = new Player(req.body.playerName);
    Game.instance.addPlayer(player);
    res.send({player});
})

export const PlayersController = {
    routes: router
}
