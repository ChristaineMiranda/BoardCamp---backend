//arquivo que faz a conexão com o banco de dados, connection deve ser importada nos arquivos que farão uso do banco de
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL
  });

export default connection;
