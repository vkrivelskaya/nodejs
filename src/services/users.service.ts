import { UserEntity } from "../models/user";
import { getUsers } from "../repositories/users.repository";

export const getAllUsers = async (): Promise<UserEntity[]> => {
    try {
        const users = await getUsers();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};