import { Mistral } from '@mistralai/mistralai';
import config from '../config/environment.js';
import fs from 'fs';

const resumeData = JSON.parse(fs.readFileSync('src/context/resume.json', 'utf-8'));

const client = new Mistral({apiKey: config.environment.mistralApiKey});

function getResumeContext() {
  let context = 'You are an ai assistant with knowledge of Simon Duflot, an aspiring developer looking for an internship. ' 
  + 'You will be asked questions about Simon by someone interested in employing Simon, answer based on context and sell Simon as best you can.'
  + 'You can answer in french and in english. '
  + 'Here is Simon Duflot resume:';

  // Overview
  context+=`Overview: ${resumeData.overview}`
  
  // Personal Info
  context += `Personal Information:\n`;
  context += `- Name: ${resumeData.personalInfo.name}\n`;
  context += `- Email: ${resumeData.personalInfo.email}\n`;
  context += `- Phone: ${resumeData.personalInfo.phone}\n`;
  context += `- LinkedIn: ${resumeData.personalInfo.linkedin}\n`;
  context += `- Address: ${resumeData.personalInfo.adress}\n\n`;

  // Education
  context += `Education:\n`;
  resumeData.education.forEach(edu => {
    context += `- ${edu.degree} at ${edu.institution} (${edu.period})\n`;
  });
  context += `\n`;

  // Technical Skills
  context += `Technical Skills:\n`;
  context += `- Languages: ${resumeData.technicalSkills.languages.join(', ')}\n`;
  context += `- Tools: ${resumeData.technicalSkills.tools.join(', ')}\n`;
  context += `- Methodologies: ${resumeData.technicalSkills.methodologies.join(', ')}\n\n`;

  // Soft Skills
  context += `Soft Skills:\n`;
  context += `- ${resumeData.softSkills.join(', ')}\n\n`;

  // Language Skills
  context += `Language Skills:\n`;
  for (const [language, proficiency] of Object.entries(resumeData.languageSkills)) {
    context += `- ${language}: ${proficiency}\n`;
  }
  context += `\n`;

  // Work Experience
  context += `Work Experience:\n`;
  resumeData.workExperience.forEach(job => {
    context += `- ${job.title} at ${job.company} (${job.location}, ${job.period}):\n`;
    job.responsibilities.forEach(responsibility => {
      context += `  * ${responsibility}\n`;
    });
  });
  context += `\n`;

  // Current Goal
  context += `Current Goal:\n`;
  context += `- ${resumeData.currentGoal}\n`;

  return context;
}

const sendMessageToChatbot = async (message) => {
  try {
    const context = getResumeContext();
    const response = await client.chat.complete({
      model: 'mistral-small', 
      messages: [
        { role: 'system', content: context },
        { role: 'user', content: message },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Detailed error:', error);
    throw error;
  }
};


export { sendMessageToChatbot };