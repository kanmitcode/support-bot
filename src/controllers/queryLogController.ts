import { Request, Response } from 'express';
import queryLogService from '../services/queryLogService';

export const getAllQueryLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryLogs = await queryLogService.getAllQueryLogs();
    res.status(200).json(queryLogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching query logs', error });
  }
};

export const createQueryLog = async (req: Request, res: Response): Promise<void> => {
  const { userName, query, response } = req.body;

  try {
    const queryLog = await queryLogService.createQueryLog(userName, query, response);
    res.status(201).json(queryLog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating query log', error });
  }
};


// import { Request, Response } from "express";
// import prisma from "../prisma";

// export const logQuery = async (req: Request, res: Response): Promise<void> => {
//   const { userName, query, response } = req.body;
//   try {
//     const log = await prisma.queryLog.create({
//       data: { userName, query, response },
//     });
//     res.status(201).json(log);
//   } catch (error) {
//     res.status(500).json({ error: "Unable to log query" });
//   }
// };

// export const getQueryLogs = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const logs = await prisma.queryLog.findMany();
//       res.status(200).json(logs);
//     } catch (error) {
//       console.error("Error fetching query logs:", error);
//       res.status(500).json({ error: "Unable to fetch query logs." });
//     }
// };