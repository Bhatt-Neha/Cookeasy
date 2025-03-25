import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import sequelize from './config/database';
import { models, syncDatabase } from './models';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CookEasy API' });
});

// Start server
const verifyModels = () => {
  try {
    Object.entries(models).forEach(([name, model]) => {
      console.log(`${name} model:`, model.name, model.tableName);
    });
  } catch (error) {
    console.error('Error verifying models:', error);
    throw error;
  }
};

const startServer = async () => {
  try {
    console.log('Starting server initialization...');
    
    // Verify models
    verifyModels();
    
    // Sync database
    console.log('Syncing database...');
    await syncDatabase();
    console.log('Database synced successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    process.exit(1);
  }
};

startServer();