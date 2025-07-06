import * as userService from "../service/user-service.js";

export const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);

    const { success, message, data } = result;

    res.status(200).json({ success, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);

    const { sussess, message, data } = result;

    res.status(200).json({ sussess, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

export const getprofile = async (req, res, next) => {
  try {
    const result = await userService.getProfile(req.headers);
    const { success, message, data } = result;
    res.status(200).json({ success, message, data });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};
