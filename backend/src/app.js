import express, { json } from 'express'; 
import path from 'path';
import 'dotenv/config'
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import config from './config/environment.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../../frontend')));

// Fallback route to serve index.html for SPA-like behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

export default app;