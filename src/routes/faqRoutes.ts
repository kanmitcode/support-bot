import { Router } from 'express';
import { getAllFAQs, getFAQById, createFAQ } from '../controllers/faqController';

const router = Router();

router.post('/api/faqs', createFAQ);
router.get('/api/faqs', getAllFAQs);
router.get('/api/faqs/:id', getFAQById);

export default router;
