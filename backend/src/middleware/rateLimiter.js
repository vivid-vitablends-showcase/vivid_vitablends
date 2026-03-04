import redisClient from '../utils/redis.js';
import logger from '../utils/logger.js';

const rateLimiter = (options = {}) => {
  const {
    windowMs = 60000, // 1 minute
    max = 100, // max requests per window
    message = 'Too many requests, please try again later',
  } = options;

  return async (req, res, next) => {
    if (
      !redisClient ||
      typeof redisClient.get !== 'function' ||
      typeof redisClient.multi !== 'function' ||
      (redisClient.isOpen === false)
    ) {
      return next();
    }

    const key = `rate_limit:${req.ip}:${req.path}`;

    try {
      const current = await redisClient.get(key);

      if (current && parseInt(current) >= max) {
        logger.warn(`Rate limit exceeded for ${req.ip} on ${req.path}`);
        return res.status(429).json({
          success: false,
          message,
          code: 'RATE_LIMIT_EXCEEDED',
        });
      }

      const multi = redisClient.multi();
      multi.incr(key);
      if (!current) {
        multi.pExpire(key, windowMs);
      }
      await multi.exec();

      next();
    } catch (error) {
      logger.error('Rate limiter error', error);
      next();
    }
  };
};

export default rateLimiter;
