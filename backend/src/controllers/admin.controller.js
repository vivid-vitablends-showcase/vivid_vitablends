import { createAdminService } from '../services/admin.service.js';
import * as adminRepository from '../repositories/admin.repository.js';

const adminService = createAdminService({ adminRepository });

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await adminService.login(username, password);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
