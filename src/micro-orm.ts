import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';

export async function initializeMikroORM() {
  const mikroOrm = await MikroORM.init(config); 
  return mikroOrm;
}