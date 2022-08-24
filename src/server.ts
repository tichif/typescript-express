import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import { config } from './config/config';
import Logging from './library/Logging';
import AuthorRoutes from './routes/Author';
import BookRoutes from './routes/Book';

const server = express();

// Connect mongoose
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: 'majority',
  })
  .then(() => {
    Logging.info('Database connected');
    startServer();
  })
  .catch((err) => {
    Logging.error('Unable to connect:');
    Logging.error(err);
  });

// Only start the server when database is connected
const startServer = () => {
  server.use((req, res, next) => {
    // Log the request
    Logging.info(
      `INCOMING -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
      // Log the response
      Logging.info(
        `OUTCOMING -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });
    next();
  });

  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());

  // CORS
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      return res.status(200).json({});
    }

    next();
  });

  // Routes
  server.use('/authors', AuthorRoutes);
  server.use('/books', BookRoutes);

  // Healthcheck
  server.get('/ping', (req, res, next) => {
    return res.status(200).json({ message: 'pong' });
  });

  // Error Handling
  server.use((req, res, next) => {
    const error = new Error('Not Found');
    Logging.error(error);

    return res.status(404).json({ error: error.message });
  });

  http
    .createServer(server)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}`)
    );
};
