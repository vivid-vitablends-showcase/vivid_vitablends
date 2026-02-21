export default {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN || '3600', 10),
  redisEnabled: process.env.REDIS_ENABLED === 'true',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  redisTtl: parseInt(process.env.REDIS_TTL || '3600', 10),
  r2: {
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucketName: process.env.R2_BUCKET_NAME,
    publicBucketId: process.env.R2_PUBLIC_BUCKET_ID,
    pathPrefix: 'products/',
  },
};
