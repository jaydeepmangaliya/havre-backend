import Admin from "../model/schemas/admin.js";
import bcrypt from "bcrypt";
import { generateToken } from "../helper/jwtHelper.js";

export const login = async (data) => {
  try {
    const { email, password } = data;

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      throw new Error("Admin not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password", 401);
    }

    // Generate JWT token
    const token = generateToken({
      id: admin.id,
      email: admin.email,
    });

    // Return response without sensitive data
    return {
      success: true,
      message: "Admin logged in successfully",
      data: {
        admin: admin,
        token: token,
      },
    };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
