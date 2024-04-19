import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserEntity } from "../models/user";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            data: null,
            error: {
                message: 'You must be an authorized user'
            }
        });
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== 'Bearer') {
        return res.status(403).json({
            data: null,
            error: {
                message: 'User is not authorized'
            }
        });
    }

    try {
        const user = jwt.verify(token, process.env.TOKEN_KEY!) as UserEntity;
        console.log(user);

        (req as any).user = user;
    } catch (err) {
        console.log (err);
        return res.status(401).send("Invalid Token");
    }
    return next();
};