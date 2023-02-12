import { Router } from "express";
import { createGame, showGames } from "../controllers/games.js";
import checkGame from "../middlewares/checkGame.js";

const gameRouter = Router();

gameRouter.post("/games", checkGame, createGame);
gameRouter.get("/games", showGames);

export default gameRouter;