import { Game } from './model/game'
import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        res.send({board: Game.instance.board});
    }
})

router.put('/proposal/draw', async(req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = Game.instance.board;
        const card = board.drawProposal(req.body.player);
        res.send({card});
    }
})

router.put('/ready', async(req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = Game.instance.board;
        board.setReady(req.body.player, req.body.index)
        res.sendStatus(200);
    }
})

router.put('/propose', async(req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = Game.instance.board;
        board.proposeCards();
        res.sendStatus(200);
    }
})

router.put('/discard', async(req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = Game.instance.board;
        board.discard(req.body.index);
        res.sendStatus(200);
    }
})

router.put('/enact', async(req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = Game.instance.board;
        board.enact(req.body.index);
        res.sendStatus(200);
    }
})

router.put('/repeal', async(req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = Game.instance.board;
        board.repeal(req.body.index);
        res.sendStatus(200);
    }
})

router.put('/proposal/shuffle', async(req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = Game.instance.board;
        board.shuffleProposals();
        res.sendStatus(200);
    }
})

router.put('/event/draw', async(req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = Game.instance.board;
        board.drawEventCard();
        res.sendStatus(200);
    }
})

router.put('/event/shuffle', async(req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = Game.instance.board;
        board.shuffleEvents();
        res.sendStatus(200);
    }
})

router.put('/points', async(req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = Game.instance.board;
        board.updatePoints(req.body.player, req.body.points);
        res.sendStatus(200);
    }
})

router.put('/swap', async(req, res) => {
    if (!Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = Game.instance.board;
        board.swapMonarch(req.body.player);
        res.sendStatus(200);
    }
})

export const BoardController = {
    routes: router
}