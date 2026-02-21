import prisma from '../utils/prisma.js';

export const create = async (data) => {
  return prisma.order.create({
    data: {
      orderId: data.orderId,
      customerName: data.customerName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      pincode: data.pincode,
      total: data.total,
      whatsappSent: data.sendWhatsApp || false,
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: true,
    },
  });
};
