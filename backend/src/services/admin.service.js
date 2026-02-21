import logger from '../utils/logger.js';
import { comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import config from '../config/index.js';

export const createAdminService = ({ adminRepository }) => ({
  login: async (username, password) => {
    logger.info('Login attempt', { username });

    if (!username || !password) {
      throw Object.assign(new Error('Username and password are required'), {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
      });
    }

    const admin = await adminRepository.findByUsername(username);

    if (!admin) {
      logger.warn('User not found', { username });
      throw Object.assign(new Error('Invalid credentials'), {
        statusCode: 401,
        code: 'INVALID_CREDENTIALS',
      });
    }

    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid) {
      logger.warn('Invalid password', { username });
      throw Object.assign(new Error('Invalid credentials'), {
        statusCode: 401,
        code: 'INVALID_CREDENTIALS',
      });
    }

    const token = generateToken({
      id: admin.id,
      username: admin.username,
      role: admin.role,
    });
    logger.info('Login success', { username, userId: admin.id });

    return {
      token,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
      expiresIn: config.jwtExpiresIn,
    };
  },
});
