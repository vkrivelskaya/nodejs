import { Request, Response, NextFunction } from "express";
import { getAllUsers } from "../services/users.service";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(401).json({
            data: null,
            error: {
                message: 'You must be an authorized user'
            }
        });
    }

    try {
        const users = await getAllUsers();
        const user = users.find(user => user.id === userId);

        if (!user) {
            return res.status(403).json({
                data: null,
                error: {
                    message: 'User is not authorized'
                }
            });
        }

        next();
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({
            data: null,
            error: {
                message: 'Failed to fetch users'
            }
        });
    }
};