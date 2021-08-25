import { Game } from './model/game'
import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    res.send({game: Game.instance});
})

router.post('/', async (req, res) => {
    Game.instance = new Game([]);
    res.sendStatus(200);
})

router.put('/start', async(req, res) => {
    Game.instance.startGame();
    res.sendStatus(200);
})

export const GameController = {
    routes: router
}