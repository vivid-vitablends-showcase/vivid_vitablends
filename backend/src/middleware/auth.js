import { verifyToken } from '../utils/jwt.js';
import logger from '../utils/logger.js';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw Object.assign(new Error('Authentication required'), {
        statusCode: 401,
        code: 'AUTH_REQUIRED'
      });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn('Authentication failed', { error: error.message });
    next(Object.assign(new Error('Invalid or expired token'), {
      statusCode: 401,
      code: 'INVALID_TOKEN'
    }));
  }
};
