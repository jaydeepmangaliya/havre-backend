import * as productService from "../service/product-service.js";

export const createProduct = async (req, res, next) => {
  try {
    const result = await productService.createProduct(req.body, req.files);
    const { success, message } = result;
    res.status(200).json({ success, message });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const result = await productService.getProducts(req.query);

    const { success, message, data } = result;

    res.status(200).json({ success, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const result = await productService.getProduct(req.params.id);

    const { success, message, data } = result;

    res.status(200).json({ success, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const result = await productService.updateProduct(req.params.id, req.body);

    const { success, message, data } = result;

    res.status(200).json({ success, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const result = await productService.getAllCategories();

    const { success, message, data } = result;

    res.status(200).json({ success, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

export const getProductByCategory = async (req, res, next) => {
  try {
    const result = await productService.getProductByCategory(
      req.params.category
    );

    const { success, message, data } = result;

    res.status(200).json({ success, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};
