import express from 'express';
import cors from 'cors';
import gameRouter from './routers/gameRouters.js';
import clientRouter from './routers/clientRouters.js';
import rentalsRouter from './routers/rentalsRouters.js';

const server = express();
server.use(cors());
server.use(express.json());
const PORT = 5000;

server.listen(PORT, () => {
    console.log("Servidor no ar!");
})

server.use([gameRouter, clientRouter, rentalsRouter]);
