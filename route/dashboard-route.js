import express from "express";
const router = express.Router();
import * as dashboardController from "../controller/dashboard-controller.js";

export default (app) => {
  router.get("/dashboard/analytics", dashboardController.getDashboardAnalytics);

  app.use("/api", router);
};
