import express, { Request, Response } from 'express';
import { cartRouter } from './routers/cart.router';
import { productRouter } from './routers/product.router';
import mongoose, { ConnectOptions } from 'mongoose';
import { authRouter } from './routers/auth.router';
import dotenv from "dotenv";

const PORT = 8000;
const app = express();

const uri: string = 'mongodb://root:nodegmp@127.0.0.1:27017/nodeapp';
dotenv.config();

mongoose.connect(uri).then(() => {
  console.log("Successfully connected to MongoDB");
}).catch((error: Error) => {
  console.log(`Error connecting to MongoDB: ${error.message}`);
});

app.use(express.json());
app.use('/api/profile/cart', cartRouter);
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}...`)
})
