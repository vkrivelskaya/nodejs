import { EntityManager } from '@mikro-orm/core';
import { User } from '../models/user.entity';
export async function seedUsers(em: EntityManager) {
  const userData = {
    id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
  };

  const user = new User();
  user.uuid = userData.id;
  em.persist(user);
  await em.flush();
}