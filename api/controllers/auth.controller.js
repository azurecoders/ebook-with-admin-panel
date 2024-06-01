import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User Created Successfuly" });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(401, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(403, "Password is incorrect"));

    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("access_token", token, {
        secure: false,
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
