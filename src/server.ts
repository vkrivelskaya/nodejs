import * as dotenv from 'dotenv'
dotenv.config()
import config from './mikro-orm.config'
import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import { Product } from './models/product.entity';
import { User } from './models/user.entity';
import { Cart } from './models/cart.entity';
import { Order } from './models/order.entity';
import { cartRouter } from './routers/cart.router';
import { productRouter } from './routers/product.router';

const PORT = 8000;
const app = express();
// interface CustomRequest extends Request {
//   em: EntityManager;
// }

// const startServer = async () => {
//   try {
//     const mikroOrm = await initializeMikroORM();
//     const em = mikroOrm.em;

//     app.use(express.json());
//     app.use((req: any, res, next) => {
//       req.em = em;
//       next();
//     });
//     app.use('/api/profile/cart', cartRouter);
//     app.use('/api/products', productRouter);

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('Error starting server:', err);
//     process.exit(1);
//   }
// };

// startServer();

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<User>,
  productRepository: EntityRepository<Product>,
  cartRepository: EntityRepository<Cart>,
  orderRepository: EntityRepository<Order>,
};

export const init = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.orderRepository = DI.orm.em.getRepository(Order);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!' }));
  app.use('/api/profile/cart', cartRouter);
  app.use('/api/products', productRouter);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  DI.server = app.listen(PORT, () => {
    console.log(`MikroORM express TS example started at http://localhost:${PORT}`);
  });
})();