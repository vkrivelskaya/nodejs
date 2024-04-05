import { User } from '../models/user.entity';
import {DI} from '../server';

export const getUsers = async (): Promise<User[]> => {
  try {
    return DI.userRepository.findAll();
  } catch (error) {
    console.error('Error fetching users', error);
    throw new Error('Failed to fetch users');
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    return DI.userRepository.findOne(id);
  } catch (error) {
    console.error('Error fetching user', error);
    throw new Error('Failed to fetch users');
  }
};
