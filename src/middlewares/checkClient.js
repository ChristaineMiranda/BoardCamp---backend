import validateData from "./validateData/validateData.js";
import clientSchema from "../schemas/clientSchema.js";
import connection from "../config/database.js";

export default async function checkClient(req, res, next) {

    const receivedClient = req.body;
    const errors = validateData(clientSchema, receivedClient);
    if (errors) {
        return res.status(400).send(errors);
    }
    try {

        const registerClient = await connection.query(`SELECT * FROM customers WHERE cpf='${receivedClient.cpf}';`);
        if (registerClient.rows.length) {
            return res.status(409).send("Esse CPF já está em uso");
        }
        next();

    } catch (error) {
        res.status(500).send(error.message);
    }
}