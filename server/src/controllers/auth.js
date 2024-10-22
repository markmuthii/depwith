import { User } from "../database/Models/User.js";
import bcrypt from "bcryptjs";
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

    res.status(201).json(user);
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
      message: "Incorrect credentials",
    });
    return;
  }

  // Login is okay
  generateJwtToken(res, { _id: user._id });

  res.json({
    message: "Login Successful",
  });
};
