"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express = require('express');
var router = express.Router();
const groceryItemController_1 = require("../Controllers/groceryItemController");
const userRouter = express.Router();
exports.userRouter = userRouter;
userRouter.get('/grocery', groceryItemController_1.getAllGrocery);
userRouter.post('/orderGrocery/:userId', groceryItemController_1.orderGrocery);
//# sourceMappingURL=userRouter.js.map