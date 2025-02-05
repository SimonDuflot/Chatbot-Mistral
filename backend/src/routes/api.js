import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { sendMessageToChatbot } from '../services/chat.js';
import config from '../config/environment.js';

const router = Router();

router.post(
  '/chat',
  [
    // Validate and sanitize the 'message' field
    body('message')
      .trim() 
      .notEmpty() 
      .withMessage('Message is required'),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const apiKey = config.mistralApiKey;
    if (!apiKey) {
      console.error("API key not found in environment variables");
      return res.status(500).json({ error: "API key not found" });
    }
    
    const { message } = req.body;

    try {
    
      const chatbotResponse = await sendMessageToChatbot(message);
      res.json({ response: chatbotResponse });
      
    } catch (error) {
      console.error('Error in /chat route:', error);
      res.status(500).json({ error: 'Failed to process message' });
    }
  }
);

export default router;