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

export const deleteQueryLogById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await queryLogService.deleteQueryLogById(Number(id));
    if (deleted) {
      res.status(200).json({ message: 'Query log successfully deleted', data: deleted });
    } else {
      res.status(404).json({ message: 'Query log not found', data: null });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete query log', error });
  }
};

export const deleteAllQueryLogs = async (_req: Request, res: Response): Promise<void> => {
  try {
    await queryLogService.deleteAllQueryLogs();
    res.status(200).json({ message: 'All query logs successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete all query logs', error });
  }
};
