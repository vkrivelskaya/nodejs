import { EntityManager } from '@mikro-orm/core';
import { initializeMikroORM } from '../micro-orm';
import { seedProducts } from '../seeders/product.seeder';
import { seedUsers } from '../seeders/user.seeder';

(async () => {
  const orm = await initializeMikroORM();
  const em = orm.em.fork();

  await seedUsers(em);
  await seedProducts(em);

  await orm.close(true);
})();