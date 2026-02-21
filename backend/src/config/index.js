export default {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN || '3600', 10),
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  redisTtl: parseInt(process.env.REDIS_TTL || '3600', 10),
};
