import User, { UserEntity } from '../models/user';

export const getUsers = async (): Promise<UserEntity[]> => {
  try {
    const users = await User.find();
    return users
  } catch (err) {
    console.error("Error finding users: ", err);
    throw new Error('Failed to fetch users');
  }
};