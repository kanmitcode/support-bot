import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import faqRoutes from './routes/faqRoutes';
import queryLogRoutes from './routes/queryLogRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(faqRoutes);
app.use(queryLogRoutes);

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('Customer Support Bot API');
});

export default app;


// import express, { Application } from "express";
// import dotenv from "dotenv";
// import faqRoutes from "./routes/faqRoutes";
// import queryLogRoutes from "./routes/queryLogRoutes";

// dotenv.config();

// const app: Application = express();
// app.use(express.json());

// // Routes
// app.get('/', (req: any, res: any) => {
//   res.status(200).json({ message: "Welcome to customer support bot api" }) 
// }
// );
// app.use("/faqs", faqRoutes);
// app.use("/logs", queryLogRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
