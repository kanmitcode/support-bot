import request from 'supertest';
import app from '../app';

describe('Query Log Routes', () => {
  it('should fetch all query logs', async () => {
    const res = await request(app).get('/api/querylogs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should create a new query log', async () => {
    const queryLog = {
      userName: 'John Doe',
      query: 'What are your business hours?',
      response: 'Our business hours are Monday to Friday, 9:00 AM to 6:00 PM. Let us know how we can assist you!',
    };

    const res = await request(app).post('/api/querylogs').send(queryLog);
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('userName', queryLog.userName);
    expect(res.body.data).toHaveProperty('query', queryLog.query);
    expect(res.body.data).toHaveProperty('response', queryLog.response);
  });

  // it('should delete a single query log by ID', async () => {
  //   const queryLogId = 1;
  //   const res = await request(app).delete(`/api/querylogs/${queryLogId}`);
  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe('Query log successfully deleted');
  // });

  // it('should delete all query logs', async () => {
  //   const res = await request(app).delete('/api/querylogs');
  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe('All query logs successfully deleted');
  // });

});
