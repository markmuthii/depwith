import { User } from "../database/Models/User.js";

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
      password,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const loginUser = (req, res) => {
  res.send("Get login endpoint");
};
