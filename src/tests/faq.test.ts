import request from 'supertest';
import app from '../app';

describe('FAQ Routes', () => {
  it('should fetch all FAQs', async () => {
    const res = await request(app).get('/api/faqs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should fetch FAQ by ID', async () => {
    const res = await request(app).get('/api/faqs/65');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('id', 65);
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
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('question', newFAQ.question);
    expect(res.body.data).toHaveProperty('answer', newFAQ.answer);
  });

  // it('should update an existing FAQ', async () => {
  //   const updatedFAQ = {
  //     question: 'What are your business hours?',
  //     answer: 'Our business hours are Monday to Friday, 9:00 AM to 6:00 PM. Let us know how we can assist you! You can contact admin via email',
  //   };
  //   const res = await request(app).put('/api/faqs/68').send(updatedFAQ);
  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe('FAQ successfully updated');
  //   expect(res.body.data).toHaveProperty('question', updatedFAQ.question);
  //   expect(res.body.data).toHaveProperty('answer', updatedFAQ.answer);
  // });

  // it('should delete a single FAQ by ID', async () => {
  //   const res = await request(app).delete('/api/faqs/1');
  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe('FAQ successfully deleted');
  // });

  // it('should delete all FAQs', async () => {
  //   const res = await request(app).delete('/api/faqs');
  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe('All FAQs successfully deleted');
  // });

});

