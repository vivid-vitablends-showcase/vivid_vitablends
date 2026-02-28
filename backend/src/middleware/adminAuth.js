import logger from '../utils/logger.js';

export const requireAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      throw Object.assign(new Error('Authentication required'), {
        statusCode: 401,
        code: 'AUTH_REQUIRED',
      });
    }

    if (req.user.role !== 'admin') {
      logger.warn('Unauthorized admin access attempt', { userId: req.user.id });
      throw Object.assign(new Error('Admin access required'), {
        statusCode: 403,
        code: 'ADMIN_REQUIRED',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
