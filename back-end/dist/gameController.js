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
exports.GameController = void 0;
const game_1 = require("./model/game");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ game: game_1.Game.instance });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    game_1.Game.instance = new game_1.Game([]);
    res.sendStatus(200);
}));
router.put('/start', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    game_1.Game.instance.startGame();
    res.sendStatus(200);
}));
exports.GameController = {
    routes: router
};
//# sourceMappingURL=gameController.js.map