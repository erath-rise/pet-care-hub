import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // HASH THE PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER

    // GENERATE JWT TOKEN
    const age = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin || false, // 假设用户模型中有 isAdmin 字段
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' } // 使用字符串格式，更易读
    );

    const { password: userPassword, ...userInfo } = user;

    // 设置 cookie 并发送响应
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // 只在生产环境使用 secure
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 根据环境调整
        maxAge: age,
      })
      .status(200)
      .json({ user: userInfo, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
