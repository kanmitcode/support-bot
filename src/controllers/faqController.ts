import { Request, Response } from 'express';
import faqService from '../services/faqService';

export const getAllFAQs = async (req: Request, res: Response): Promise<void> => {
  try {
    const faqs = await faqService.getAllFAQs();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQs', error });
  }
};

export const getFAQById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const faq = await faqService.getFAQById(Number(id));
    if (faq) {
      res.status(200).json(faq);
    } else {
      res.status(404).json({ message: 'FAQ not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQ', error });
  }
};

export const createFAQ = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = await faqService.createFAQ({ question, answer });
    res.status(201).json(newFAQ);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ message: 'Failed to create FAQ' });
  }
};

