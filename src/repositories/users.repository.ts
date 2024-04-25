import logger from '../logger';
import User, { ROLE, UserEntity } from '../models/user';

export const getUsers = async (): Promise<UserEntity[]> => {
  try {
    const users = await User.find();
    return users
  } catch (err) {
    logger.error("Error finding users: ", err);
    throw new Error('Failed to fetch users');
  }
};

export const getUser = async (email: string): Promise<UserEntity | null> => {
  try {
      const user = await User.findOne({ email });
      return user;
  } catch (error) {
      logger.error('Error fetching user', error);
      return null;
  }
};

export const registerUser = async (user: UserEntity): Promise<boolean> => {
  try {
      const newUser = new User(user);
      await newUser.save();
      return true;
  } catch (error) {
      logger.error('Error registering user:', error);
      return false;
  }
};