import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import './models/associations';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CookEasy API' });
});

export default app;