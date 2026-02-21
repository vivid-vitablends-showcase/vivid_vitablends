import { createClient } from 'redis';
import logger from './logger.js';
import config from '../config/index.js';

const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on('error', (err) => logger.error('Redis Client Error', err));
redisClient.on('connect', () => logger.info('Redis Client Connected'));

await redisClient.connect();

export default redisClient;
