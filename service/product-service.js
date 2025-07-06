import Product from "../model/schemas/product.js";
import Image from "../model/schemas/image.js";
import { getPagination, getPaginationResponse } from "../helper/pagination.js";
import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export const createProduct = async (data, images) => {
  try {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const s3 = new AWS.S3({
      region: process.env.AWS_REGION,
    });

    const files = images;

    const uploadedImages = [];

    for (let key in files) {
      const file = files[key][0];
      const params = {
        Bucket: "havre-s3",
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const uploadResult = await s3.upload(params).promise();
      uploadedImages.push(uploadResult.Location);
    }

    const Images = uploadedImages.map((image) => {
      return {
        url: image,
      };
    });

    const { productName, description, price, category, weight, serving } = data;

    if (
      !productName ||
      !description ||
      !price ||
      !category ||
      !weight ||
      !serving ||
      Images.length === 0
    ) {
      throw new Error("All fields are required", 400);
    }

    const product = await Product.create(
      {
        name: productName,
        description: description,
        price: price,
        category: category,
        weight: weight,
        serving: serving,
        images: Images,
      },
      {
        include: [{ model: Image, as: "images" }],
      }
    );
    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async (queryParams) => {
  try {
    const { page } = queryParams;

    const { limit, offset } = getPagination(page);

    const data = await Product.findAndCountAll({
      limit,
      offset,
      distinct: true,
      col: "id",
      include: [{ model: Image, as: "images" }],
      order: [["createdAt", "ASC"]],
    });

    const response = getPaginationResponse(data, page, limit);
    return {
      success: true,
      message: "Products fetched successfully",
      data: response,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Image, as: "images" }],
    });

    return {
      success: true,
      message: "Product fetched successfully",
      data: product,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const category = await Product.findAll({
      attributes: ["category"],
      group: "category",
    });

    return {
      success: true,
      message: "Categories fetched successfully",
      data: category,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductByCategory = async (category) => {
  try {
    const product = await Product.findAll({
      where: {
        category: category,
      },
    });

    return {
      success: true,
      message: "Products fetched successfully",
      data: product,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
