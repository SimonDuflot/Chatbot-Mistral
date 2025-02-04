const ERROR_TYPES = {
  CONFIG_ERROR: 'ConfigError',
  VALIDATION_ERROR: 'ValidationError',
  AUTHORIZATION_ERROR: 'AuthorizationError',
  RATE_LIMIT_ERROR: 'RateLimitError',
  DATABASE_ERROR: 'DatabaseError',
  NOT_FOUND_ERROR: 'NotFoundError',
  SERVICE_UNAVAILABLE_ERROR: 'ServiceUnavailableError',
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); 

  // Default error response
  const errorResponse = {
    error: 'Something went wrong!',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  };

  // Handle specific error types
  switch (err.name) {
    case ERROR_TYPES.CONFIG_ERROR:
      if (err.message.includes('API_KEY')) {
        errorResponse.error = 'Server configuration error: Missing API key. Please check environment variables.';
      }
      res.status(500).json(errorResponse);
      break;

    case ERROR_TYPES.VALIDATION_ERROR:
      errorResponse.error = err.message;
      res.status(400).json(errorResponse);
      break;

    case ERROR_TYPES.AUTHORIZATION_ERROR:
      errorResponse.error = 'Unauthorized access';
      res.status(401).json(errorResponse);
      break;

    case ERROR_TYPES.RATE_LIMIT_ERROR:
      errorResponse.error = 'Too many requests';
      res.status(429).json(errorResponse);
      break;

    case ERROR_TYPES.NOT_FOUND_ERROR:
      errorResponse.error = 'Resource not found';
      res.status(404).json(errorResponse);
      break;

    case ERROR_TYPES.SERVICE_UNAVAILABLE_ERROR:
      errorResponse.error = 'Service unavailable';
      res.status(503).json(errorResponse);
      break;

    default:
      // Generic error response
      res.status(500).json(errorResponse);
      break;
  }
};

export default errorHandler;