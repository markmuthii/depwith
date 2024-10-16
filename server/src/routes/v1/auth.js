import { Router } from "express";
import { loginUser, registerUser } from "../../controllers/auth.js";
import {
  validateUserLogin,
  validateUserRegistration,
} from "../../middleware/validators.js";

const authRouter = Router();

// /api/v1/auth/register
authRouter.post("/register", validateUserRegistration, registerUser);

// /api/v1/auth/login
authRouter.post("/login", validateUserLogin, loginUser);

export { authRouter };
