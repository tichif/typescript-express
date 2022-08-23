import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@ts-express.ohvawvn.mongodb.net/ts-express`;

const PORT = process.env.PORT || 5000;

export const config = {
  mongo: {
    url: MONGO_URI,
  },
  server: {
    port: PORT,
  },
};
