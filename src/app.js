const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const config = require('./config/config');
const connectDB = require('./config/database');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

app.use(helmet());

app.use(cors());

app.use(morgan('combined', {
  stream: { write: message => logger.info(message.trim()) },
  skip: (req, res) => config.server.env !== 'development',
}));

app.use(express.json());

app.use('/v1/data', dataRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Data API is running',
    version: '1.0.0',
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route not found: ${req.originalUrl}`,
    },
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = config.server.port;
    
    app.listen(PORT, () => {
      logger.info(`Server running in ${config.server.env} mode on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  logger.error(err.name, err.message, err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down...');
  logger.error(err.name, err.message, err.stack);
  process.exit(1);
});

startServer();

module.exports = app; 