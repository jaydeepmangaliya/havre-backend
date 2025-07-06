import * as orderService from "../service/order-service.js";

export const createOrder = async (req, res, next) => {
  try {
    const result = await orderService.createOrder(req.body);

    const { success, message, data } = result;

    res.status(200).json({ success, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};
