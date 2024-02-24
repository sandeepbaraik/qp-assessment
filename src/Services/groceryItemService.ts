import connection  from '../Connections/db';
import moment from 'moment-timezone';
// import { GroceryItem } from '../models/GroceryItem';
const tz = "Asia/Kolkata";

export const getAllGroceryItems = async() => {
    try {
        const queryString = 'SELECT * FROM groceries';
        const response = await connection.query(queryString);
        return response[0];
    } catch (err) {
        throw err;
    }
};

export const createGroceryItem = async(data: any) => {
    try {
        const { name, price, quantity } = data;
        const queryString = `INSERT INTO groceries (name, price, quantity)
            VALUES ('${name}', ${price}, ${quantity})`;
        await connection.query(queryString);
    } catch (err) {
        throw err;
    }
};

export const updateGroceryItem = async(data: any, params:any) => {
    try {
        const { name, price, quantity } = data;
        let queryString = `UPDATE groceries SET `;
        if(name) queryString += `name = '${name}', `;
        if(price) queryString += `price = ${price}, `;
        if(quantity) queryString += `quantity = ${quantity}, `
        queryString = queryString.slice(0, -2) + ' ';
        queryString += `WHERE id = ${+params.id}` ;
        await connection.query(queryString);
    } catch (err) {
        throw err;
    }
};

export const deleteGroceryItem = async(data: any,) => {
    try {
        const queryString = `DELETE FROM groceries WHERE id = ${data.id}`;
        await connection.query(queryString);
    } catch (err) {
        throw err;
    }
};

export const orderGroceryItems = async(data: any) => {
    try {
        const {orders, userId} = data;
        console.log('data: ', data);
        
        let orderIds = Object.keys(orders);
        let orderIdsWithQuotes = "'" + orderIds.join("','") + "'";
        const queryString = `SELECT id, name, quantity, price FROM groceries WHERE id IN (${orderIdsWithQuotes})`;
        let groceries: any = await connection.query(queryString);
        if(groceries && groceries.length > 0) {
            groceries = groceries[0];
            let orderGroceries: {groceryId: any; quantity: any; totalPrice: number; }[] = [];
            let orderDetails: any = [];
            let updatedGroceryItem: any = {};
            let totalPriceOfOrder = 0;
            for(let i = 0; i < groceries.length; i++) {
                let item = groceries[i];
                // let grocery: any = item;
                let {id, quantity, price} = item;
                if(orders[id].quantity <= quantity) {
                    updatedGroceryItem[item.id] =  item.quantity - orders[id].quantity;
                    let totalPricePerItem = orders[id].quantity * price; 
                    totalPriceOfOrder += totalPricePerItem;
                    orderGroceries.push({groceryId: item.id, quantity: orders[id].quantity, totalPrice: totalPricePerItem})
                    orderDetails.push({name: item.name, quantity: orders[id].quantity, price: totalPricePerItem})
                } else {
                    return {message: "Order quantity exceeds our stock"};
                }
            }
            console.log('orderGroceries: ', orderGroceries);
            
            const date = moment().tz(tz).format("YYYY-MM-DD HH:mm:ss");
            let ordersQuery = `INSERT INTO orders (userId, orderDate) VALUES (${userId}, '${date}')`
            let orderResp: any = await connection.query(ordersQuery);
            let orderGroceriesQuery = `INSERT INTO order_groceries (orderId, groceryId, quantity, totalPrice) VALUES `
            if(orderGroceries.length > 0) {
                for(let item of orderGroceries) {
                    orderGroceriesQuery += `(${orderResp[0].insertId}, ${item.groceryId}, ${item.quantity}, ${item.totalPrice}), `;
                    const groceriesQuery = `UPDATE groceries SET quantity = ${updatedGroceryItem[item.groceryId]}`;
                    await connection.query(groceriesQuery);
                    console.log('orderGroceriesQuery: ', orderGroceriesQuery);
                    
                }
                orderGroceriesQuery = orderGroceriesQuery.slice(0,-2);
                await connection.query(orderGroceriesQuery);
                return {message: "Order successfull", orderItems: orderDetails, totalPrice: totalPriceOfOrder};
            }
        } else {
            return {message: "Items Not Available"};
        }
    } catch (err) {
        throw err;
    }
};

