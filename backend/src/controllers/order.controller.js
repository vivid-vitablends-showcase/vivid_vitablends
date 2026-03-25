import * as orderService from '../services/order.service.js';
import logger from '../utils/logger.js';

export const create = async (req, res, next) => {
  try {
    logger.info('Order creation attempt', {
      hasCustomerName: !!req.body.customerName,
      hasPhone: !!req.body.phone,
      hasItems: Array.isArray(req.body.items),
      itemCount: req.body.items?.length || 0,
    });
    const order = await orderService.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    logger.info('Fetching all orders', { userId: req.user?.id });
    const orders = await orderService.getAll();
    logger.info('Orders fetched', { count: orders.length });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    logger.error('Failed to fetch orders', { error: error.message });
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await orderService.updateStatus(id, status);
    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // [H-01] Enforce ownership: non-admin users can only access their own orders
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return next(Object.assign(new Error('Forbidden'), { statusCode: 403 }));
    }
    const orders = await orderService.getByUserId(userId);
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
