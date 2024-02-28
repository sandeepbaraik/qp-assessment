"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./routes/userRouter");
const adminRouter_1 = require("./routes/adminRouter");
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use('/user', userRouter_1.userRouter);
app.use('/admin', adminRouter_1.adminRouter);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost: ${port}`);
});
//# sourceMappingURL=index.js.map