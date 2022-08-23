import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import { config } from './config/config';
import Logging from './library/Logging';

const server = express();

// Connect mongoose
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: 'majority',
  })
  .then(() => Logging.info('Database connected'))
  .catch((err) => {
    Logging.error('Unable to connect:');
    Logging.error(err);
  });
