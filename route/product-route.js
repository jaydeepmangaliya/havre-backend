import express from "express";
const router = express.Router();
import * as productController from "../controller/product-controller.js";
import multer from "multer";

export default (app) => {
  router.post(
    "/createProduct",
    multer().fields([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
    ]),
    productController.createProduct
  );
  router.get("/getProducts", productController.getProducts);
  router.get("/getProduct/:id", productController.getProduct);
  router.put("/updateProduct/:id", productController.updateProduct);
  router.get("/category", productController.getAllCategories);
  router.get(
    "/getProductByCategory/:category",
    productController.getProductByCategory
  );

  app.use("/api", router);
};
