import { User } from "../models/userModel.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = { name, email, password };
    // const user = await User.create({ name, email, password });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
