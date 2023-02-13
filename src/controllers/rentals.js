import connection from '../config/database.js';
import dayjs from 'dayjs';

export async function createRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const date = dayjs(Date.now()).format('YYYY-MM-DD');

    try {
        const game = await connection.query(`SELECT * FROM games WHERE id=$1;`, [gameId]);
        const originalPrice = game.rows[0].pricePerDay * daysRented;

        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);`, [customerId, gameId, date, daysRented, null, originalPrice, null]);

        res.status(201).send("OK");

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function finalizeRentals(req, res) {
    const { id } = req.params;
    const returnDate = dayjs(Date.now());

    try {
        let delayFeePrice = null;
        const rental = await connection.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
        const rentDate = rental.rows[0].rentDate;
        const days = returnDate.diff(rentDate, "day");
        const extraDays = days - rental.rows[0].daysRented;
        if (extraDays > 0) {
            const game = await connection.query(`SELECT * FROM games WHERE id=$1;`, [rental.rows[0].gameId]);
            const price = game.rows[0].pricePerDay;
            delayFeePrice = extraDays * price;
        }

        await connection.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2`, [returnDate, delayFeePrice]);
        res.status(200).send("OK");

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function listRentals(req, res) {
    try {

        const showRentals = await connection.query(`SELECT json_build_object(
            'id', rentals.id,
            'customerId', rentals."customerId",
            'gameId', rentals."gameId",
            'rentDate', rentals."rentDate",
            'daysRented', rentals."daysRented",
            'returnDate', rentals."returnDate",
            'originalPrice', rentals."originalPrice",
            'delayFee', rentals."delayFee",
            'customer', json_build_object(
                'id', customers.id,
                'name', customers.name
            ),
            'game', json_build_object(
                'id', games.id,
                'name', games.name
            )
        ) FROM rentals JOIN customers ON rentals."customerId" = customers.id
          JOIN games ON rentals."gameId" = games.id;    
        `);
        res.status(200).send(showRentals.rows);    
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteRental(req, res){
    const{id} = req.params;
    try {
        const resultRental = await connection.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
        if(!resultRental.rows.length){
            return res.status(404).send("Registro de aluguel não encontrado");
        }
        if(!resultRental.rows[0].returnDate){
            return res.status(400).send("Aluguel ainda não finalizado. Registro não pode ser excluído");
        }
        await connection.query(`DELETE FROM rentals WHERE id=$1;`, [id]);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}