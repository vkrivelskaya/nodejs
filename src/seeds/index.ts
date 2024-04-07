import { MikroORM } from '@mikro-orm/core';
import config from '../mikro-orm.config';
import { seedProducts } from '../seeders/product.seeder';
import { seedUsers } from '../seeders/user.seeder';

async function seedDatabase() {
  const orm = await MikroORM.init(config);
  const em = orm.em;

  try {
    await seedUsers(em);
    await seedProducts(em);

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await orm.close();
  }
}

seedDatabase();