import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { cartRouter } from './routers/cart.router.js';
import { productRouter } from './routers/product.router.js';
import  config  from './mikro-orm.config.js'
import { EntityManager } from '@mikro-orm/core';
import { initializeMikroORM } from './micro-orm.js';

const PORT = 8000;
const app = express();
interface CustomRequest extends Request {
  em: EntityManager;
}

const startServer = async () => {
  try {
    const mikroOrm = await initializeMikroORM();
    const em = mikroOrm.em;

    app.use(express.json());
    app.use((req: any, res, next) => {
      req.em = em;
      next();
    });
    app.use('/api/profile/cart', cartRouter);
    app.use('/api/products', productRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();