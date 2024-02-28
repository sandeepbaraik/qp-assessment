"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderGroceryItems = exports.deleteGroceryItem = exports.updateGroceryItem = exports.createGroceryItem = exports.getAllGroceryItems = void 0;
const db_1 = __importDefault(require("../Connections/db"));
// import { GroceryItem } from '../models/GroceryItem';
const tz = "Asia/Kolkata";
const getAllGroceryItems = async () => {
    try {
        const queryString = 'SELECT * FROM groceries';
        const response = await db_1.default.query(queryString);
        return response[0];
    }
    catch (err) {
        throw err;
    }
};
exports.getAllGroceryItems = getAllGroceryItems;
const createGroceryItem = async (data) => {
    try {
        const { name, price, quantity } = data;
        const queryString = `INSERT INTO groceries (name, price, quantity)
            VALUES ('${name}', ${price}, ${quantity})`;
        await db_1.default.query(queryString);
    }
    catch (err) {
        throw err;
    }
};
exports.createGroceryItem = createGroceryItem;
const updateGroceryItem = async (data, params) => {
    try {
        const { name, price, quantity } = data;
        let queryString = `UPDATE groceries SET `;
        if (name)
            queryString += `name = '${name}', `;
        if (price)
            queryString += `price = ${price}, `;
        if (quantity)
            queryString += `quantity = ${quantity}, `;
        queryString = queryString.slice(0, -2) + ' ';
        queryString += `WHERE id = ${+params.id}`;
        await db_1.default.query(queryString);
    }
    catch (err) {
        throw err;
    }
};
exports.updateGroceryItem = updateGroceryItem;
const deleteGroceryItem = async (data) => {
    try {
        const queryString = `DELETE FROM groceries WHERE id = ${data.id}`;
        await db_1.default.query(queryString);
    }
    catch (err) {
        throw err;
    }
};
exports.deleteGroceryItem = deleteGroceryItem;
const orderGroceryItems = async (params, data) => {
    try {
        const orders = data.orders;
        const userId = params.userId;
        console.log('data: ', data);
        let orderIds = Object.keys(orders);
        let orderIdsWithQuotes = "'" + orderIds.join("','") + "'";
        const queryString = `SELECT id, name, quantity, price FROM groceries WHERE id IN (${orderIdsWithQuotes})`;
        let groceries = await db_1.default.query(queryString);
        if (groceries && groceries.length > 0) {
            groceries = groceries[0];
            let orderGroceries = [];
            let orderDetails = [];
            let updatedGroceryItem = {};
            let totalPriceOfOrder = 0;
            for (let i = 0; i < groceries.length; i++) {
                let item = groceries[i];
                // let grocery: any = item;
                let { id, quantity, price } = item;
                if (orders[id].quantity <= quantity) {
                    updatedGroceryItem[item.id] = item.quantity - orders[id].quantity;
                    let totalPricePerItem = orders[id].quantity * price;
                    totalPriceOfOrder += totalPricePerItem;
                    orderGroceries.push({ groceryId: item.id, quantity: orders[id].quantity, totalPrice: totalPricePerItem });
                    orderDetails.push({ name: item.name, quantity: orders[id].quantity, price: totalPricePerItem });
                }
                else {
                    return { message: "Order quantity exceeds our stock" };
                }
            }
            console.log('orderGroceries: ', orderGroceries);
            let ordersQuery = `INSERT INTO orders (userId) VALUES (${userId})`;
            let orderResp = await db_1.default.query(ordersQuery);
            let orderGroceriesQuery = `INSERT INTO order_groceries (orderId, groceryId, quantity, totalPrice) VALUES `;
            if (orderGroceries.length > 0) {
                for (let item of orderGroceries) {
                    orderGroceriesQuery += `(${orderResp[0].insertId}, ${item.groceryId}, ${item.quantity}, ${item.totalPrice}), `;
                    const groceriesQuery = `UPDATE groceries SET quantity = ${updatedGroceryItem[item.groceryId]} WHERE id = ${item.groceryId}`;
                    await db_1.default.query(groceriesQuery);
                    console.log('orderGroceriesQuery: ', orderGroceriesQuery);
                }
                orderGroceriesQuery = orderGroceriesQuery.slice(0, -2);
                await db_1.default.query(orderGroceriesQuery);
                return { message: "Order successfull", orderItems: orderDetails, totalPrice: totalPriceOfOrder };
            }
        }
        else {
            return { message: "Items Not Available" };
        }
    }
    catch (err) {
        throw err;
    }
};
exports.orderGroceryItems = orderGroceryItems;
//# sourceMappingURL=groceryItemService.js.map