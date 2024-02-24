import express from 'express';
import { getAllGrocery, createGrocery, updateGrocery, deleteGrocery } from '../Controllers/groceryItemController';
// import { addGroceryItem, updateGroceryItem, deleteGroceryItem } from '../controllers/adminController';
const adminRouter = express.Router();

adminRouter.get('/grocery', getAllGrocery);
adminRouter.post('/createGrocery', createGrocery);
adminRouter.put('/updateGrocery/:id', updateGrocery);
adminRouter.delete('/deleteGrocery/:id', deleteGrocery);

export { adminRouter };