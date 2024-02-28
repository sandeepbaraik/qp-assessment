"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderGrocery = exports.deleteGrocery = exports.updateGrocery = exports.createGrocery = exports.getAllGrocery = void 0;
const groceryItemService_1 = require("../Services/groceryItemService");
const getAllGrocery = async (req, res) => {
    try {
        let response = await (0, groceryItemService_1.getAllGroceryItems)();
        res.status(200).send(response);
    }
    catch (err) {
        console.log('getAllGrocery err:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllGrocery = getAllGrocery;
const createGrocery = async (req, res) => {
    try {
        let response = await (0, groceryItemService_1.createGroceryItem)(req.body);
        res.status(200).json({ message: 'Grocery item created successfully' });
        ;
    }
    catch (err) {
        console.log('createGrocery err: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createGrocery = createGrocery;
const updateGrocery = async (req, res) => {
    try {
        let response = await (0, groceryItemService_1.updateGroceryItem)(req.body, req.params);
        res.status(200).json({ message: 'Grocery item updated successfully' });
        ;
    }
    catch (err) {
        console.log('updateGrocery err: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateGrocery = updateGrocery;
const deleteGrocery = async (req, res) => {
    try {
        let response = await (0, groceryItemService_1.deleteGroceryItem)(req.params);
        res.status(200).json({ message: 'Grocery item deleted successfully' });
    }
    catch (err) {
        console.log('deleteGrocery err: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteGrocery = deleteGrocery;
const orderGrocery = async (req, res) => {
    try {
        let response = await (0, groceryItemService_1.orderGroceryItems)(req.params, req.body);
        res.status(200).json(response);
    }
    catch (err) {
        console.log('deleteGrocery err: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.orderGrocery = orderGrocery;
//# sourceMappingURL=groceryItemController.js.map