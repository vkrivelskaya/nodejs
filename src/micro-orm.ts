import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config'; // Import the configuration for MikroORM

export async function initializeMikroORM() {
  const mikroOrm = await MikroORM.init(config); // Initialize MikroORM with the configuration
  return mikroOrm;
}