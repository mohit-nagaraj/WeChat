import { User } from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { createToken } from "../utils/util.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  if (validator.isEmail(email) === false) {
    return res.status(400).json({ message: "Invalid email" });
  }
  if (validator.isStrongPassword(password) === false) {
    return res.status(400).json({ message: "Password is not strong enough" });
  }
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = createToken(user._id);

    res
      .status(201)
      .json({ id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  if (validator.isEmail(email) === false) {
    return res.status(400).json({ message: "Invalid email" });
  }
  try {
    let user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const findOneUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      creaatedAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

