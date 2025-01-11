import { Client, Message, ClientOptions, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';
import openai from './config/openai';
import prisma from './config/db';
import logger from './utils/logger';
// import { generateQRCode } from './utils/qrUtils';

dotenv.config();

const clientOptions: ClientOptions = {
  puppeteer: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
  },
  webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2403.2.html', },
  authStrategy: new LocalAuth(),
};

export const client = new Client(clientOptions);

const sessionData: Record<string, string> = {}; // In-memory session storage

// const sessions: { [key: string]: string } = {};

client.on('qr', (qr: string) => {
  console.log('QR Code received. Scan with your WhatsApp.');
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('Bot is authenticated.');
});

client.on('auth_failure', (msg) => {
  console.error('Authentication failed:', msg);
});

client.on('disconnected', (reason) => {
  console.warn('Client disconnected:', reason);
});

// Error Handling
client.on('error', (error) => {
  console.error('Error occurred:', error);
});

client.on('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', async (message: Message) => {
  try {
    const botName = "Chaty";
    const sender = message.from;
    if (sessionData[sender] === undefined) {
      const greetingMessage = `Hi! I'm ${botName}, your support assistant. What's your name?`;
      await client.sendMessage(sender, greetingMessage);
      sessionData[sender] = '';
      logger.info(`${sender}: ${message.body}`);
      return;
    } else if (sessionData[sender] === '') {
      sessionData[sender] = message.body.trim();
      await client.sendMessage(sender, `Nice to meet you, ${message.body}! How can I assist you today?`);
      logger.info(`message: ${message.body}`);
    } else if (message.body.toLowerCase() === 'exit') {
      await message.reply('Goodbye!');
      delete sessionData[sender]; // Clear session
    } else {
      // Check if the message matches an FAQ
      const faq = await prisma.fAQ.findFirst({
        where: {
          question: {
            contains: message.body,
            mode: 'insensitive',
          },
        },
      });

      const response = faq ? faq.answer : await getAIResponse(message.body);

      await client.sendMessage(sender, response);

      // Log the query
      await prisma.queryLog.create({
        data: {
          userName: sessionData[sender],
          query: message.body,
          response,
        },
      });
    }
  } catch (error) {
    logger.error(`Error handling message: ${message.body}, ${error}`);
    await message.reply('Sorry, something went wrong.');
  }
});

const getAIResponse = async (query: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: query }],
    });

    return response.choices[0]?.message?.content || 'Sorry, I could not find an answer.';
  } catch (error) {
    logger.error(`Error getting AI response: ${error}`);
    return 'Sorry, I could not retrieve a response.';
  }
};

client.initialize();
