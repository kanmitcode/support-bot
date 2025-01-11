import request from 'supertest';
import app from '../app'; // Assuming app.js or app.ts is where your Express app is defined
import { Client, ClientOptions } from 'whatsapp-web.js';

// Mocking the WhatsApp Client initialization since we're using supertest to check the API
jest.mock('whatsapp-web.js', () => ({
  Client: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    emit: jest.fn(),
    initialize: jest.fn()
  }))
}));

describe('WhatsApp Bot HTTP Endpoints', () => {
  let client: Client;

  beforeEach(() => {
    const clientOptions: ClientOptions = {
      puppeteer: {
        headless: true,
      },
    };

    client = new Client(clientOptions); // Create a mocked WhatsApp client
  });

  it('should initialize the WhatsApp client on bot start', async () => {
    // You would need an API or an endpoint in your Express app to trigger bot initialization
    await request(app)
      .post('/api/bot/init') // This is where you can set up your own API route
      .expect(200);  // Checking if it returns success response after initializing the bot

    // Validate that the WhatsApp client initialize method was called
    expect(client.initialize).toHaveBeenCalled();
  });

  it('should receive a message and respond with FAQ', async () => {
    const userMessage = 'What are your business hours?';
    
    const mockFaqResponse = 'Our business hours are 9 AM to 6 PM.';
    
    const faqService = require('../services/faqService');
    faqService.getFAQById = jest.fn().mockResolvedValue({ answer: mockFaqResponse });

    const queryLogService = require('../services/queryLogService');
    queryLogService.createQueryLog = jest.fn();

    // Send the user query and expect a response from the bot
    const res = await request(app)
      .post('/api/bot/message')
      .send({ message: userMessage })
      .expect(200); // Expect a 200 OK status

    // Validate the response
    expect(res.body).toHaveProperty('response', mockFaqResponse);

    // Optionally, validate if the query was logged correctly
    expect(queryLogService.createQueryLog).toHaveBeenCalledWith('User', userMessage, mockFaqResponse);
  });

  it('should handle messages that don’t have a FAQ answer', async () => {
    const userMessage = 'What is your return policy?';
    
    const mockNoAnswerResponse = "I'm sorry, I couldn't find an answer to your query.";

    // Mocking services again for no answer
    const faqService = require('../services/faqService');
    faqService.getFAQById = jest.fn().mockResolvedValue(null);

    const queryLogService = require('../services/queryLogService');
    queryLogService.createQueryLog = jest.fn();

    // Send the user query and expect a response from the bot
    const res = await request(app)
      .post('/api/bot/message')
      .send({ message: userMessage })
      .expect(200);  // Expect a 200 OK status

    // Validate the response
    expect(res.body).toHaveProperty('response', mockNoAnswerResponse);

    // Optionally, validate if the query was logged
    expect(queryLogService.createQueryLog).toHaveBeenCalledWith('User', userMessage, mockNoAnswerResponse);
  });
});
