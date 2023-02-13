import {Router} from 'express';
import {createRentals, finalizeRentals} from '../controllers/rentals.js';
import checkRental from '../middlewares/checkRental.js';
const rentalsRouter = Router();

rentalsRouter.post("/rentals", checkRental, createRentals);
rentalsRouter.post("/rentals/:id/return", finalizeRentals);
//rentalsRouter.get("/rentals", showRentals);

export default rentalsRouter;