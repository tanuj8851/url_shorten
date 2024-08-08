import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check User
    const existingUser = await userModel.findOne({ email });

    // existingUSer
    if (existingUser) {
      return res.send({
        success: true,
        message: "Already Registered please Login.",
      });
    }

    //register user

    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModel({
      username,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Failed to Register", error });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ error: `Email and Password are required.` });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ success: false, message: "Failed to Login", error });
    }

    //compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.send({
        success: false,
        message: "Password Not Matched.",
        error,
      });
    }

    //token generation
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).send({
      success: true,
      message: " Login Successfully",
      user: {
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Failed to Login", error });
  }
};

export const testController = (req, res) => {
  res.send("Protected ROutes");
};
