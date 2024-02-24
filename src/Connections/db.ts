import * as mysql from 'mysql2';
import {config} from './config'

var connection = mysql.createConnection(config.db).promise();

async function connectDB() {
  try {
    await connection.connect();
    createTables();
  } catch(err) {
    console.log('Failed to connect to DB', err);
  }
}
connectDB();

async function createTables() {
  try {
    console.log('Connected to MySQL database');
    const createGroceries = `
      CREATE TABLE IF NOT EXISTS groceries (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL
      )`;
    await connection.query(createGroceries);
    console.log('groceries table created or already exists');

    const createOrders = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL,
        orderDate DATETIME NOT NULL
      )`;
    await connection.query(createOrders);
    console.log('orders table created or already exists');

    const createOrderGroceries = `
    CREATE TABLE IF NOT EXISTS order_groceries (
      id INT PRIMARY KEY AUTO_INCREMENT,
      orderId INT NOT NULL,
      groceryId INT NOT NULL,
      quantity INT NOT NULL,
      totalPrice DECIMAL(10, 2) NOT NULL,
      CONSTRAINT fk_order_id FOREIGN KEY (orderId) REFERENCES orders(id),
      CONSTRAINT fk_grocery_id FOREIGN KEY (groceryId) REFERENCES groceries(id)
    )`;
    await connection.query(createOrderGroceries);
    console.log('orders table created or already exists');
  } catch(err) {
    console.log('Failed to create table: ', err);
    
  }
}

export default connection;