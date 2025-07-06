import User from "../model/schemas/users.js";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../helper/jwtHelper.js";

export const register = async (data) => {
  try {
    const { firstname, lastname, email, phone, password, confrompassword } =
      data;

    if (!firstname || !email || !phone || !password || !confrompassword) {
      throw new Error("All fields are required", 400);
    }

    if (password !== confrompassword) {
      throw new Error("Password and confirm password do not match", 400);
    }

    const isUser = await User.findOne({ where: { email } });

    if (isUser) {
      throw new Error("User already exists", 400);
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName: firstname,
      lastName: lastname,
      password: hashedPassword,
      phoneNumber: phone,
      email: email,
    });

    // Return response without sensitive data
    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// login
export const login = async (data) => {
  try {
    const { email, password } = data;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password", 401);
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    // Return response without sensitive data
    return {
      success: true,
      message: "User logged in successfully",
      data: {
        token: token,
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProfile = async (headers) => {
  try {
    // Decode the JWT token to get user information
    console.log("header", headers);
    const token = headers.authorization;
    console.log("token", token);

    const jwttoken = token.split(" ")[1];
    console.log("jwt", jwttoken);
    const decoded = verifyToken(jwttoken);
    console.log("email", decoded);
    const { email } = decoded;
    // Find user by email from the decoded token
    const user = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password", "confirmPassword"] },
      raw: true,
    });

    if (!user) {
      throw new Error("User not found", 404);
    }

    return {
      success: true,
      message: "User fetched successfully",
      data: user,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
