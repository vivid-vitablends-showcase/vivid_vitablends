import * as orderRepository from '../repositories/order.repository.js';
import logger from '../utils/logger.js';

const validateOrderData = (data) => {
  const errors = [];

  if (!data.customerName || typeof data.customerName !== 'string' || data.customerName.trim() === '') {
    errors.push({ field: 'customerName', message: 'Customer name is required' });
  }

  if (!data.phone || typeof data.phone !== 'string' || !/^\d{10}$/.test(data.phone)) {
    errors.push({ field: 'phone', message: 'Phone number must be 10 digits' });
  }

  if (!data.address || typeof data.address !== 'string' || data.address.trim() === '') {
    errors.push({ field: 'address', message: 'Address is required' });
  }

  if (!data.city || typeof data.city !== 'string' || data.city.trim() === '') {
    errors.push({ field: 'city', message: 'City is required' });
  }

  if (!data.pincode || typeof data.pincode !== 'string' || !/^\d{6}$/.test(data.pincode)) {
    errors.push({ field: 'pincode', message: 'Pincode must be 6 digits' });
  }

  if (!Array.isArray(data.items) || data.items.length === 0) {
    errors.push({ field: 'items', message: 'Order must contain at least one item' });
  } else {
    data.items.forEach((item, index) => {
      if (!item.productId || !item.name || !item.quantity || !item.price) {
        errors.push({ field: `items[${index}]`, message: 'Invalid item structure' });
      }
    });
  }

  if (typeof data.total !== 'number' || data.total <= 0) {
    errors.push({ field: 'total', message: 'Total must be a positive number' });
  }

  if (errors.length > 0) {
    const error = new Error('Invalid order data');
    error.statusCode = 400;
    error.code = 'VALIDATION_ERROR';
    error.errors = errors;
    throw error;
  }
};

const generateOrderId = () => {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `ORD-${dateStr}-${randomStr}`;
};

export const create = async (data) => {
  validateOrderData(data);

  const orderId = generateOrderId();
  const orderData = { ...data, orderId };

  logger.info('Creating order', { orderId, total: data.total, itemCount: data.items.length });
  return await orderRepository.create(orderData);
};
