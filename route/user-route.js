import express from "express";
const router = express.Router();
import * as userController from "../controller/user-controller.js";

export default (app) => {
  router.post("/register", userController.register);
  router.post("/login", userController.login);
  router.get("/profile", userController.getprofile);

  app.use("/api", router);
};
