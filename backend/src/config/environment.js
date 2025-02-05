import dotenv from 'dotenv';

// Only try to load .env file if not in production
if (process.env.NODE_ENV !== 'production') {
    const result = dotenv.config();
    if (result.error) {
        throw new Error('Error loading .env file: ' + result.error.message);
    }
}

// Validate environment
const currentEnvironment = process.env.NODE_ENV || 'development';
const validEnvironments = ['development', 'production', 'test'];

if (!validEnvironments.includes(currentEnvironment)) {
    throw new Error(`Invalid NODE_ENV: ${currentEnvironment}. Must be one of: ${validEnvironments.join(', ')}`);
}

// Environment configurations
const environment = {
    development: {
        mistralApiKey: process.env.MISTRAL_API_KEY_DEV,
        mistralApiUrl: process.env.MISTRAL_API_URL_DEV || 'https://api.mistral.ai/v1',
    },
    production: {
        mistralApiKey: process.env.MISTRAL_API_KEY_PROD,
        mistralApiUrl: process.env.MISTRAL_API_URL_PROD || 'https://api.mistral.ai/v1',
    },
    test: {
        mistralApiKey: process.env.MISTRAL_API_KEY_TEST,
        mistralApiUrl: process.env.MISTRAL_API_URL_TEST || 'https://api.mistral.ai/v1',
    },
};

const config = environment[currentEnvironment];


console.log('Current Environment:', currentEnvironment);
console.log('Config Errors:', configErrors);
console.log('API Key exists:', !!environment[currentEnvironment].mistralApiKey);

// Configuration validation
const validateConfig = (config, env) => {
    const errors = [];

    // Check for required API key
    if (!config.mistralApiKey) {
        errors.push(`Missing MISTRAL_API_KEY_${env.toUpperCase()}`);
    }

    // Validate API URL format
    if (config.mistralApiUrl) {
        try {
            new URL(config.mistralApiUrl);
        } catch (e) {
            errors.push(`Invalid MISTRAL_API_URL_${env.toUpperCase()}: ${config.mistralApiUrl}`);
        }
    }

    return errors;
};

const configErrors = validateConfig(config, currentEnvironment);

if (configErrors.length > 0) {
    if (currentEnvironment === 'production') {
        throw new Error(`Configuration errors in ${currentEnvironment} environment:\n${configErrors.join('\n')}`);
    } else {
        console.warn(`Configuration warnings in ${currentEnvironment} environment:`);
        configErrors.forEach(error => console.warn(`  - ${error}`));
    }
}

// Freeze configuration to prevent modifications
const finalConfig = Object.freeze({
    ...config,
    environment: currentEnvironment,
});

export default finalConfig;