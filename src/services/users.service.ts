import { ROLE, UserEntity } from "../models/user";
import { getUsers, getUser as getUserByEmail, registerUser as register } from "../repositories/users.repository";

export const getAllUsers = async (): Promise<UserEntity[]> => {
    try {
        const users = await getUsers();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};

export const getUser = async (email: string): Promise<UserEntity | null> => {
    try {
        const user: UserEntity | null = await getUserByEmail(email);

        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};


export const registerUser = async (email: string, password: string, role: ROLE): Promise<UserEntity | null> => {
    try {
        const newUser = {
            id: crypto.randomUUID(),
            email,
            password,
            role,
        } as UserEntity;

        await register(newUser);
        return newUser;
    } catch (error) {
        console.error('Error registering user:', error);
        return null;
    }
};