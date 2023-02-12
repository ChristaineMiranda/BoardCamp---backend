import { Router } from "express";
import { createGame } from "../controllers/games.js";
import checkGame from "../middlewares/checkGame.js";

const gameRouter = Router();

gameRouter.post("/creategame", checkGame, createGame);

export default gameRouter;