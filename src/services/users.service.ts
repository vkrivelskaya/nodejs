import { EntityManager } from '@mikro-orm/core';
import { User } from "../models/user.entity";
import { getUsers } from "../repositories/users.repository";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    return getUsers();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};