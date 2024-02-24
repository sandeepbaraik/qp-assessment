var express = require('express');
var router = express.Router();
import {getAllGrocery, orderGrocery } from '../Controllers/groceryItemController';

const userRouter = express.Router();
userRouter.get('/grocery', getAllGrocery);
userRouter.post('/orderGrocery', orderGrocery);

export { userRouter };
