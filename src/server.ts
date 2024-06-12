import express, { Request, Response } from 'express';
import { cartRouter } from './routers/cart.router';
import { productRouter } from './routers/product.router';

const PORT = 8000;
const app = express();

app.use(express.json());
app.use('/api/profile/cart', cartRouter);
app.use('/api/products', productRouter);
app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}...`)
})