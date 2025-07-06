import express from "express";
const router = express.Router();
import * as adminController from "../controller/admin-controller.js";

export default (app) => {
  router.post("/login", adminController.login);

  app.use("/admin", router);
};
