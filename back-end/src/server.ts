import express from "express"
import bodyParser from "body-parser";
import { PlayersController } from "./playersController";
import { GameController } from "./gameController";
import { BoardController } from "./boardController";
(() => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(function(req, res, next) {
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
    })

    app.use("/api/players", PlayersController.routes);
    app.use("/api/game", GameController.routes);
    app.use("/api/board", BoardController.routes);

    app.listen(3000, () => console.log('Server listening on port 3000!'));
})()