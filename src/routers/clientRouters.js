import {Router} from 'express';
import { createClient, getClientId, getAllClients, updateClient } from '../controllers/clients.js';
import checkClient from '../middlewares/checkClient.js';
import checkUpdateCliente from '../middlewares/checkUpdateClient.js';

const clientRouter = Router();

clientRouter.post("/customers", checkClient, createClient);
clientRouter.get("/customers", getAllClients);
clientRouter.get("/customers/:id", getClientId);
clientRouter.put("/customers/:id", checkUpdateCliente, updateClient);
export default clientRouter;