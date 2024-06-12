import express, { Request, Response } from 'express';
import { cartRouter } from './routers/cart.router';
import { productRouter } from './routers/product.router';
import mongoose from 'mongoose';
import { authRouter } from './routers/auth.router';
import dotenv from "dotenv";
import { healthRouter } from './routers/health.router';
import logger from './logger';
import { requestLogger } from './middleware/request-info-logger.middleware';

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://root:nodegmp@127.0.0.1:27017/nodeapp';
const app = express();

app.use(requestLogger);

mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info("Successfully connected to MongoDB");
  })
  .catch((error: Error) => {
    logger.error(`Error connecting
    to MongoDB: ${error.message}`);
  });

app.use(express.json());
app.use('/api/profile/cart', cartRouter);
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/health', healthRouter);
const server = app.listen(PORT,() => {
  logger.info(`Listening on port ${PORT}...`)
});

let connections: any[] = [];

server.on('connection', (connection) => {
  connections.push(connection);

  connection.on('close', () => {
    connections = connections.filter((currentConnection: any) => currentConnection !== connection);
  });
});
function shutdown() {
  logger.info('Received kill signal, shutting down gracefully');

  mongoose.connection.close()
    .then(() => {
      logger.info('MongoDB connection closed');

      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    })
    .catch((err) => {
      logger.error('Error closing MongoDB connection:', err);
      process.exit(1);
    });


  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 20000);

  connections.forEach((connection) => connection.end());

  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
