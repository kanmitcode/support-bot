import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import faqRoutes from './routes/faqRoutes';
import queryLogRoutes from './routes/queryLogRoutes';
import qrRoutes from './routes/qrRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const publicFolderPath = path.join(__dirname, 'public');
if (!fs.existsSync(publicFolderPath)) {
  fs.mkdirSync(publicFolderPath, { recursive: true });
  console.log(`Created 'public' folder at ${publicFolderPath}`);
}

app.use(faqRoutes);
app.use(queryLogRoutes);
app.use(qrRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Customer Support Bot API');
});

export default app;
