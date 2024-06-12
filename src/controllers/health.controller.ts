import mongoose from "mongoose";
import { Request, Response } from 'express';

export const healthCheck = async (req: Request, res: Response) => {
    const serverStatus = 'running';
    const databaseStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    const healthStatus = serverStatus === 'running' && databaseStatus === 'connected' ? 'healthy' : 'unhealthy';
    res.status(healthStatus === 'healthy' ? 200 : 500).json({ status: healthStatus });
};