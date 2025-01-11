import request from 'supertest';
import app from '../app';

describe('Query Log Routes', () => {
  it('should fetch all query logs', async () => {
    const res = await request(app).get('/api/querylogs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new query log', async () => {
    const queryLog = {
      userName: 'John Doe',
      query: 'What are your business hours?',
      response: 'Our business hours are from 9 AM to 5 PM.',
    };

    const res = await request(app)
      .post('/api/querylogs')
      .send(queryLog);
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('userName', queryLog.userName);
    expect(res.body).toHaveProperty('query', queryLog.query);
    expect(res.body).toHaveProperty('response', queryLog.response);
  });
});
