import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { handleError } from "../utils/handlerError.js";
import cloudinary from "../config/cloudinary.config.js";

export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await User.findOne({ _id: userid })
      .select("-password")
      .lean()
      .exec();

    if (!user) {
      next(handleError(404, "User not found."));
    }
    res.status(200).json({
      success: true,
      message: "User data found.",
      user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const { userid } = req.params;

    const user = await User.findById(userid);
    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;

    if (data.password && data.password.length >= 8) {
      const hashedPassword = bcrypt.hashSync(data.password);
      user.password = hashedPassword;
    }

    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "LearnSphere-Blogs",
          resource_type: "auto",
        });

        if (!uploadResult || !uploadResult.secure_url) {
          return next(handleError(500, "Image upload failed"));
        }

        user.avatar = uploadResult.secure_url;
      } catch (error) {
        return next(handleError(500, error.message));
      }
    }

    await user.save();

    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    res.status(200).json({
      success: true,
      message: "Data updated.",
      user: newUser,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Data deleted.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
