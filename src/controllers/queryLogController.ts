import { Request, Response } from 'express';
import queryLogService from '../services/queryLogService';

export const getAllQueryLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryLogs = await queryLogService.getAllQueryLogs();
    res.status(200).json({ message: 'Query log success', data: queryLogs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching query logs', error });
  }
};

export const createQueryLog = async (req: Request, res: Response): Promise<void> => {
  const { userName, query, response } = req.body;
  try {
    const queryLog = await queryLogService.createQueryLog(userName, query, response);
    res.status(201).json({ message: 'Query log successfully created', data: queryLog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating query log', error });
  }
};
