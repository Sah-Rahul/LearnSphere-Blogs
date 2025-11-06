import jwt from "jsonwebtoken";

export const sendToken = (res, user, message, statusCode = 200) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "3d" }
  );

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 7 days
    })
    .status(statusCode)
    .json({
      success: true,
      message,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
};
