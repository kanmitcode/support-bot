import { Router } from 'express';
import {
  getAllQueryLogs,
  createQueryLog,
  deleteQueryLogById,
  deleteAllQueryLogs,
} from '../controllers/queryLogController';

const router = Router();

router.post('/api/querylogs', createQueryLog);
router.get('/api/querylogs', getAllQueryLogs);
router.delete('/api/querylogs/:id', deleteQueryLogById);
router.delete('/api/querylogs', deleteAllQueryLogs);

export default router;
