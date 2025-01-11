import { Router } from 'express';
import { getAllFAQs, getFAQById, createFAQ } from '../controllers/faqController';

const router = Router();

router.get('/api/faqs', getAllFAQs);
router.get('/api/faqs/:id', getFAQById);
router.post('/api/faqs', createFAQ);
export default router;
