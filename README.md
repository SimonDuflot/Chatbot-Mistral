# ChatBot Project Docker Setup

## Prerequisites
- Docker
- Docker Compose
- Git

## Environment Setup

1. Clone the repository
   ```bash
   git clone <your-repository-url>
   cd ChatBot
   ```

2. Create environment file
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your Mistral API key
   ```
   MISTRAL_API_KEY_DEV=your_actual_mistral_api_key_here
   ```

## Running the Application

### Development Mode
```bash
docker-compose up --build
```

### Stopping the Application
```bash
docker-compose down
```

## Troubleshooting
- Ensure Docker and Docker Compose are installed
- Check that your `.env` file is correctly configured
- Verify all dependencies are listed in `package.json`

## Notes for Instructor
- The application runs on port 3000
- Environment variables are managed through the `.env` file
- Docker volumes are configured for easy development and testing

## Docker Setup and Installation

### Prerequisites
```bash
# Check Docker version 
# For Linux
docker --version
docker compose version
# For Windows & Mac
docker --version
docker-compose --version
```

```bash
# After installation run:
docker run hello-world
```
This downloads a test image and verifies Docker is working properly.

#### Windows/Mac
- Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Requires Windows 10/11 Pro or Mac with Intel/Apple Silicon

#### Linux (Ubuntu/Debian)
```bash
# Install Docker and Docker Compose
sudo apt-get update
sudo apt-get install docker-ce docker-compose-plugin

# Add your user to docker group
sudo usermod -aG docker $USER
```
