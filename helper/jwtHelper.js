import jwt from "jsonwebtoken";

// JWT token generation function
export const generateToken = (payload) => {
  return jwt.sign(payload, "jaydeep" || "your-secret-key", {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });
};

// JWT token verification function
export const verifyToken = (token) => {
  try {

    return jwt.verify(token, process.env.JWT_SECRET || "jaydeep");
    
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

// Extract token from Authorization header
export const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided or invalid format");
  }
  return authHeader.substring(7); // Remove 'Bearer ' prefix
};
