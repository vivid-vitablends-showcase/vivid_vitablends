import * as orderService from '../services/order.service.js';

export const create = async (req, res, next) => {
  try {
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
