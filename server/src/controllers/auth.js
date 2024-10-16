import { User } from "../database/Models/User.js";
import bcrypt from "bcryptjs";

// async... await
// then...catch
export const registerUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Password hashing
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    res.json(user);
  } catch (error) {
    console.log({ MongooseError: error });

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const loginUser = (req, res) => {
  res.send("Get login endpoint");
};
