import { Router } from 'express';
import { getAllQueryLogs, createQueryLog } from '../controllers/queryLogController';

const router = Router();

router.post('/api/querylogs', createQueryLog);
router.get('/api/querylogs', getAllQueryLogs);

export default router;
