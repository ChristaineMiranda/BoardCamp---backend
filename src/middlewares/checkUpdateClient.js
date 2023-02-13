import connection from "../config/database.js";
import clientSchema from "../schemas/clientSchema.js";
import validateData from "./validateData/validateData.js";

export default async function checkUpdateCliente(req, res, next){
    const {id} = req.params;
    const receivedUpdate = req.body;
    const errors = validateData(clientSchema, receivedUpdate);
   
    if(errors){
        return res.status(400).send(errors);
    }
    try {
        const cpfresults = await connection.query(`SELECT * FROM customers WHERE cpf=$1 AND id <> $2;`, [receivedUpdate.cpf, id])
        if(cpfresults.rows.length){
            return res.status(409).send("Esse CPF já está em uso");
        }
        next();

    } catch (error) {
        res.status(500).send(error.message);
    }
}