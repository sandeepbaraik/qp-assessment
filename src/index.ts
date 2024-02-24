import express from 'express';
import { userRouter } from './routes/userRouter';
import { adminRouter } from './routes/adminRouter';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost: ${port}`);
});