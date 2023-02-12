import validateData from "./validateData/validateData.js";
import gameSchema from "../schemas/gameSchema.js";
import connection from "../config/database.js";


export default async function checkGame(req, res, next) {

    const receivedData = req.body;
    const errors = validateData(gameSchema, receivedData);
    if (errors) {
        return res.status(400).send(errors);
    }
    try {
        const record = await connection.query(`SELECT * FROM games WHERE name='${receivedData.name}'`);
        if (record.rows.length) {
            return res.status(409).send("Esse nome já está cadastrado");
        }

        next();

    } catch (error) {
        res.status(500).send(error.message);
    }
}