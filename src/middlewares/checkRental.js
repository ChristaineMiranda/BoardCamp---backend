import connection from '../config/database.js';

export default async function checkRental(req, res, next){
    const {customerId, gameId, daysRented} = req.body;

    if(daysRented <=0 || isNaN(customerId) || customerId <=0 || isNaN(gameId) || gameId<= 0){
        return res.status(400).send("Preencha corretamente os campos");
    }


    try {
        const validCustomer = await connection.query(`SELECT * FROM customers WHERE id=$1;`, [customerId]);
        if(!validCustomer.rows.length){
            return res.status(400).send("Cliente não encontrado");            
        }

        const validGame = await connection.query(`SELECT * FROM games WHERE id=$1;`, [gameId]);
        if(!validGame.rows.length){
            return res.status(400).send("Jogo não encontrado");
        }
        const validRental = await connection.query(`SELECT * FROM rentals WHERE "gameId"=$1`, [gameId]);
        const stock = validGame.rows[0].stockTotal;
        if(validRental.rows.length==stock){
            return res.status(400).send("Não há mais exemplares desse jogo no estoque");
        }

        next();
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}