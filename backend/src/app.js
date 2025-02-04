import express, { json } from 'express'; 
import 'dotenv/config'
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import config from './config/environment.js';

const app = express(); 

// Middleware
app.use(cors()); 
app.use(json()); 

// Routes
app.use('/api', apiRoutes);
app.get('/health', (req, res) => { 
  res.status(200).json({ status: 'OK' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});

// Log configuration details at startup
console.log(`Running in ${config.environment} mode`);
console.log(`Using Mistral API at ${config.mistralApiUrl}`);

// Error handling middleware 
app.use(errorHandler); 

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.stack);

  server.close(() => {
    console.log('Server closed due to uncaught exception');
    process.exit(1); 
  });
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.stack);

  server.close(() => {
    console.log('Server closed due to unhandled rejection');
    process.exit(1); 
  });
});

export default app;