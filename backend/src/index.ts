import express from 'express';
import cors from 'cors';
import routes from './routes';
import config from './config';

const app = express();

// Enable JSON body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: config.passkey.origin,
  credentials: true,
}));

// Simple session middleware (for demo purposes)
// In production, use a proper session store
app.use((req, res, next) => {
  if (!req.session) {
    req.session = {};
  }
  next();
});

// API routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.env}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
}); 