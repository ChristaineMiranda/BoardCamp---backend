//arquivo que faz a conexão com o banco de dados
import pg from 'pg';

const {Pool} = pg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

export default connection;
