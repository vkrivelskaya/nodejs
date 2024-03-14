import { Request, Response, NextFunction } from "express";
const users: any = []

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(401).json({
        data: null,
        error: {
          message: 'You must be authorized user'
        }
      });
    }

    const user = users[userId as string];

    if (!user) {
      return res.status(403).json({
        data: null,
        error: {
          message: 'User is not authorized'
        }
      });
    }

    next();
  };