import { Router } from 'express';
import { getAllQueryLogs, createQueryLog } from '../controllers/queryLogController';

const router = Router();

router.get('/api/querylogs', getAllQueryLogs);
router.post('/api/querylogs', createQueryLog);

export default router;
