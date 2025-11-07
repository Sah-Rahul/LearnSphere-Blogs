import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { handleError } from "../utils/handlerError.js";

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log("Register request:", name, email);

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return next(handleError(409, "User already registered."));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      next(handleError(404, "Invalid login credentials."));
    }
    const hashedPassword = user.password;

    const comparePassword = await bcrypt.compare(password, hashedPassword);
    if (!comparePassword) {
      next(handleError(404, "Invalid login credentials."));
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || "https://avatar.iran.liara.run/public",
      },
      process.env.JWT_SECRET_KEY
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    res.status(200).json({
      success: true,
      user: newUser,
      message: `Welcome back ${user.name}`,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
