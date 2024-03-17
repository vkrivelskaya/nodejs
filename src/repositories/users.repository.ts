import fs from 'fs';
import path from 'path';
import { UserEntity } from '../models/user';

const USERS_DB_FILE = path.resolve(__dirname, '../db', 'users.db.json');

export const getUsers = async (): Promise<UserEntity[]> => {
  try {
    const data = await fs.promises.readFile(USERS_DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users data:', error);
    return [];
  }
};
