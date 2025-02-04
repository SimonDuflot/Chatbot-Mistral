# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package files and install dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Copy entire project back to /app
WORKDIR /app
COPY . .

# Expose the port your backend uses
EXPOSE 3000

# Default command to start the application
CMD ["node", "backend/src/app.js"]