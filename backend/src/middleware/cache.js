import redisClient from '../utils/redis.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

export const cache = (ttl = config.redisTtl) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cached = await redisClient.get(key);
      if (cached) {
        logger.info('Cache HIT', { key });
        res.setHeader('X-Cache', 'HIT');
        return res.json(JSON.parse(cached));
      }

      logger.info('Cache MISS', { key });
      res.setHeader('X-Cache', 'MISS');

      res.sendResponse = res.json;
      res.json = async (body) => {
        await redisClient.setEx(key, ttl, JSON.stringify(body));
        res.sendResponse(body);
      };

      next();
    } catch (err) {
      logger.error('Redis cache error', err);
      next();
    }
  };
};

export const clearCache = async (pattern = '*') => {
  try {
    const keys = await redisClient.keys(`cache:${pattern}`);
    if (keys.length > 0) {
      await redisClient.del(keys);
      logger.info('Cache cleared', { pattern, count: keys.length });
    }
  } catch (err) {
    logger.error('Redis clear cache error', err);
  }
};
