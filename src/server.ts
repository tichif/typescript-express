import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import { config } from './config/config';

const server = express();

// Connect mongoose
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: 'majority',
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));
