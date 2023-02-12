import connection from "../config/database.js";

export async function createGame(req, res){
   
     const {name, image, stockTotal, pricePerDay} = req.body;
    
     try {
        await connection.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay]);
        res.status(201).send('OK');
     } catch (error) {
        res.status(500).send(error.message);
     }
}

export async function showGames(req, res){
   try {
      const results = await connection.query(`SELECT * FROM games;`);
      res.status(200).send(results.rows);
      
   } catch (error) {
      res.status(500).send(error.message);
   }
}