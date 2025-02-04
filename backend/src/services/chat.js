import { Mistral } from '@mistralai/mistralai';
import config from '../config/environment.js';

const client = new Mistral({apiKey: config.environment.mistralApiKey});

const sendMessageToChatbot = async (message) => {
  try {
    const response = await client.chat.complete({
      model: 'mistral-small', 
      messages: [{ role: 'user', content: message }],
    });
    console.log(`Running in ${config.environment} mode`);
    console.log(`Using Mistral API at ${config.mistralApiUrl}`);
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Detailed error:', error);
  }
};



export { sendMessageToChatbot };