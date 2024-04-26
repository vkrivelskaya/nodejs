import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const { method, originalUrl } = req;
        const status = res.statusCode;
        let logLevel: string;
        if (status >= 500) {
            logLevel = 'error';
        } else if (status >= 400) {
            logLevel = 'warn';
        } else {
            logLevel = 'info';
        }
        const timestamp = new Date().toUTCString();
        logger.info(`[${timestamp}] ${logLevel.toUpperCase()} ${method.toUpperCase()} ${originalUrl} - ${duration}ms`);
    });

    next();
};