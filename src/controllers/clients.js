import connection from '../config/database.js';

export async function createClient(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getClientId(req, res) {
    const { id } = req.params;
    try {

        const client = await connection.query(`SELECT * FROM customers WHERE id = ${id};`);
        if (client.rows.length) {
            return res.status(200).send(client.rows[0]);
        }
        res.status(404).send("Usuário não encontrado")

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getAllClients(req, res) {
    try {
        const allClients = await connection.query(`SELECT * FROM customers;`);
        res.status(200).send(allClients.rows);


    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function updateClient(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    try {
        await connection.query(`UPDATE customers SET name = $1, phone = $2, cpf=$3, birthday=$4 WHERE id=${id};`, [name, phone, cpf, birthday]);
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send(error.message);
    }
}