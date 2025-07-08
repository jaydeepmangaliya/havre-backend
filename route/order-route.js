import express from "express";
const router = express.Router();
import * as orderController from "../controller/order-controller.js";

export default (app) => {
  router.post("/createOrder", orderController.createOrder);
  router.get('/getOrders', orderController.getOrders);
  router.get('/getOrder/:id', orderController.getOrderById);

  app.use("/api", router);
};
