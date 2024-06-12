import { Request, Response, NextFunction } from "express";


export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admins can perform this action' });
    }
    next();
};
