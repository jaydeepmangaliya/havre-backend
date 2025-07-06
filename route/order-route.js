import express from "express";
const router = express.Router();
import * as orderController from "../controller/order-controller.js";

export default (app) => {
  router.post("/createOrder", orderController.createOrder);

  app.use("/api", router);
};
