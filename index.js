import express from "express";
import db from "./model/index.js";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./helper/exceptionHandling.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
    ],
    credentials: true,
  })
);

import productRoutes from "./route/product-route.js";
import userRoutes from "./route/user-route.js";
import orderRoutes from "./route/order-route.js";
import adminRoutes from "./route/admin-route.js";

adminRoutes(app);
orderRoutes(app);
userRoutes(app);
productRoutes(app);

// Handle 404 - Page Not Found (must come after all routes)
app.use(notFoundHandler);

// Global error handler middleware (must come last)
app.use(globalErrorHandler);

db.sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.listen(3000, () => console.log("Server is running on port 3000"));
