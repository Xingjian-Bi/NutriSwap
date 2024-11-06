import jwt from "jsonwebtoken";

export const generateTokenForLogin = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 6 * 24 * 60 * 60 * 1000,
  });

  return token;
};