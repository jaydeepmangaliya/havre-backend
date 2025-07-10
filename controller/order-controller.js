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

export const getOrders = async (req, res, next) => {
  try {
    const result = await orderService.getOrders()

    const { success, message, data } = result;
  console.log(data);
    res.status(200).json({ success, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};


export const getOrderById = async (req, res, next) => {
  try {
    const result = await orderService.getOrderById(req.params.id)

    const { success, message, data } = result;
  console.log(data);
    res.status(200).json({ success, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const result = await orderService.deleteOrder(req.query.id)

    const { success, message } = result;
  
    res.status(200).json({ success, message });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};