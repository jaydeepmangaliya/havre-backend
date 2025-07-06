import * as adminService from "../service/admin-service.js";

export const login = async (req, res, next) => {
  try {
    const result = await adminService.login(req.body);

    const { sussess, message, data } = result;

    res.status(200).json({ sussess, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};
