import Order from "../model/schemas/orders.js";

export const createOrder = async (orderData) => {
  try {
    const order = await Order.create(orderData);
    return {
      success: true,
      message: "Order created successfully",
      data: order,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
