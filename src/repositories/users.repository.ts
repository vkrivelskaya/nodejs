import { EntityManager } from '@mikro-orm/core';
import { initializeMikroORM } from '../micro-orm';
import { User } from '../models/user.entity';

export const getUsers = async (): Promise<User[]> => {
  try {
    const mikroOrm = await initializeMikroORM();
    const em = mikroOrm.em;
    return em.find(User, {});
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};