import app from './app';
import dotenv from 'dotenv';
import './bot';

const port = process.env.PORT || 3000;

dotenv.config();

app.listen(port, () => {
  console.log(`Server is running on Port:${port}`);
});
