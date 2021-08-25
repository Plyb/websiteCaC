"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const playersController_1 = require("./playersController");
const gameController_1 = require("./gameController");
const boardController_1 = require("./boardController");
(() => {
    const app = express_1.default();
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({
        extended: false
    }));
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        try {
            next();
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
    app.use("/api/players", playersController_1.PlayersController.routes);
    app.use("/api/game", gameController_1.GameController.routes);
    app.use("/api/board", boardController_1.BoardController.routes);
    app.listen(3000, () => console.log('Server listening on port 3000!'));
})();
//# sourceMappingURL=server.js.map