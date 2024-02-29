import * as mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
}).promise();

async function connectDB() {
  try {
    await connection.connect();
  } catch(err) {
    console.log('Failed to connect to DB', err);
  }
}

connectDB();


export default connection;