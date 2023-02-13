import {Router} from 'express';
import {createRentals, deleteRental, finalizeRentals, listRentals} from '../controllers/rentals.js';
import { checkFinishRentals } from '../middlewares/checkFinishRental.js';
import checkRental from '../middlewares/checkRental.js';

const rentalsRouter = Router();

rentalsRouter.post("/rentals", checkRental, createRentals);
rentalsRouter.post("/rentals/:id/return", checkFinishRentals , finalizeRentals);
rentalsRouter.get("/rentals", listRentals);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;