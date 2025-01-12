import express from 'express';
import * as faqController from '../controllers/faqController';

const router = express.Router();

router.post('/api/faqs', faqController.createFAQ);
router.get('/api/faqs', faqController.getAllFAQs);
router.get('/api/faqs/:id', faqController.getFAQById);
router.put('/api/faqs/:id', faqController.updateFAQ);
router.delete('/api/faqs/:id', faqController.deleteFAQById);
router.delete('/api/faqs', faqController.deleteAllFAQs);

export default router;
