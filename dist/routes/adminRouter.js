"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const groceryItemController_1 = require("../Controllers/groceryItemController");
// import { addGroceryItem, updateGroceryItem, deleteGroceryItem } from '../controllers/adminController';
const adminRouter = express_1.default.Router();
exports.adminRouter = adminRouter;
adminRouter.get('/grocery', groceryItemController_1.getAllGrocery);
adminRouter.post('/createGrocery', groceryItemController_1.createGrocery);
adminRouter.put('/updateGrocery/:id', groceryItemController_1.updateGrocery);
adminRouter.delete('/deleteGrocery/:id', groceryItemController_1.deleteGrocery);
//# sourceMappingURL=adminRouter.js.map