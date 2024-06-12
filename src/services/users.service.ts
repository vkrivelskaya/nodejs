import { User } from "../models/user.entity";
import { getUserById, getUsers } from "../repositories/users.repository";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    return getUsers();
  } catch (error) {
    console.error('Error fetching users', error);
    throw new Error('Failed to fetch users');
  }
};

export const getUser = async (id: string): Promise<User | null> => {
  try {
    return getUserById(id);
  } catch (error) {
    console.error('Error fetching user', error);
    throw new Error('Failed to fetch user');
  }
};