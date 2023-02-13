import connection from "../config/database.js";

export async function checkFinishRentals(req, res, next){
    const {id} = req.params;
    try {
        const validRental = await connection.query(`SELECT * FROM rentals WHERE id=$1;`, [id])
        if(!validRental.rows.length){
            return res.status(404).send("Aluguel não encontrado");
        }
        if(validRental.rows[0].returnDate){
            return res.status(400).send("Esse aluguel já foi finalizado");
        }
        next();

    } catch (error) {
        res.status(500).send(error.message);
    }
}