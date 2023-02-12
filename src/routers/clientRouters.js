import {Router} from 'express';
import { createClient, getClientId, getAllClients } from '../controllers/clients.js';
import checkClient from '../middlewares/checkClient.js';

const clientRouter = Router();

clientRouter.post("/customers", checkClient, createClient);
clientRouter.get("/customers", getAllClients);
clientRouter.get("/customers/:id", getClientId);

export default clientRouter;