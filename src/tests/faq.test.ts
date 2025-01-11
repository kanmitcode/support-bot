import request from 'supertest';
import app from '../app';

describe('FAQ Routes', () => {
  it('should fetch all FAQs', async () => {
    const res = await request(app).get('/api/faqs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fetch FAQ by ID', async () => {
    const res = await request(app).get('/api/faqs/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('should return 404 for non-existing FAQ', async () => {
    const res = await request(app).get('/api/faqs/999');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('FAQ not found');
  });

  it('should create a new FAQ', async () => {
    const newFAQ = {
      question: 'What is your refund policy?',
      answer: 'Contact our support team or visit our website. Provide your order number and item details.',
    };
    const res = await request(app).post('/api/faqs').send(newFAQ);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('question', newFAQ.question);
    expect(res.body).toHaveProperty('answer', newFAQ.answer);
  });
});
