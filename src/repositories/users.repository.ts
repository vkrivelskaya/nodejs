import User, { ROLE, UserEntity } from '../models/user';

export const getUsers = async (): Promise<UserEntity[]> => {
  try {
    const users = await User.find();
    return users
  } catch (err) {
    console.error("Error finding users: ", err);
    throw new Error('Failed to fetch users');
  }
};

export const getUser = async (email: string): Promise<UserEntity | null> => {
  try {
      const user = await User.findOne({ email });
      return user;
  } catch (error) {
      console.error('Error fetching user', error);
      return null;
  }
};

export const registerUser = async (user: UserEntity): Promise<boolean> => {
  try {
      const newUser = new User(user);
      await newUser.save();
      return true;
  } catch (error) {
      console.error('Error registering user:', error);
      return false;
  }
};