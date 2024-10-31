import bcrypt from "bcryptjs";
import { Balance, User } from "../database/Models/index.js";
import { generateJwtToken } from "../utils/generate-jwt-token.js";

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

    await Balance.create({
      user: user._id,
    });

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log({ MongooseError: error });

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username,
  });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Incorrect credentials",
    });
    return;
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  // const passwordsMatch2 = bcrypt.compareSync(password, user.password);

  // 12345
  // $2a$10$7qDwKWKPCgH9b8ODV6kU8exUthqcEQ0GsMvRwpk/mLwJMz2FVU31q
  if (!passwordsMatch) {
    res.status(400).json({
      success: false,
      message: "Incorrect credentials",
    });
    return;
  }

  // Login is okay
  generateJwtToken(res, { _id: user._id });

  res.json({
    success: true,
    message: "Login Successful",
  });
};

export const logoutUser = async (req, res) => {
  res.clearCookie(process.env.AUTH_COOKIE_NAME).json({
    success: true,
    message: "Logout Successful",
  });
};
