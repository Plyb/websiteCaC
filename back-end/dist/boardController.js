"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardController = void 0;
const game_1 = require("./model/game");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        res.send({ board: game_1.Game.instance.board });
    }
}));
router.put('/proposal/draw', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = game_1.Game.instance.board;
        const card = board.drawProposal(req.body.player);
        res.send({ card });
    }
}));
router.put('/ready', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = game_1.Game.instance.board;
        board.setReady(req.body.player, req.body.index);
        res.sendStatus(200);
    }
}));
router.put('/propose', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = game_1.Game.instance.board;
        board.proposeCards();
        res.sendStatus(200);
    }
}));
router.put('/discard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = game_1.Game.instance.board;
        board.discard(req.body.index);
        res.sendStatus(200);
    }
}));
router.put('/enact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = game_1.Game.instance.board;
        board.enact(req.body.index);
        res.sendStatus(200);
    }
}));
router.put('/repeal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = game_1.Game.instance.board;
        board.repeal(req.body.index);
        res.sendStatus(200);
    }
}));
router.put('/proposal/shuffle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = game_1.Game.instance.board;
        board.shuffleProposals();
        res.sendStatus(200);
    }
}));
router.put('/event/draw', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = game_1.Game.instance.board;
        board.drawEventCard();
        res.sendStatus(200);
    }
}));
router.put('/event/shuffle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = game_1.Game.instance.board;
        board.shuffleEvents();
        res.sendStatus(200);
    }
}));
router.put('/points', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = game_1.Game.instance.board;
        board.updatePoints(req.body.player, req.body.points);
        res.sendStatus(200);
    }
}));
router.put('/swap', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!game_1.Game.instance) {
        res.sendStatus(400);
    }
    else {
        const board = game_1.Game.instance.board;
        board.swapMonarch(req.body.player);
        res.sendStatus(200);
    }
}));
exports.BoardController = {
    routes: router
};
//# sourceMappingURL=boardController.js.map