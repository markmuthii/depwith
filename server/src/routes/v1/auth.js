import { Router } from "express";
import {
  deleteRegisterUser,
  getRegisterUser,
  loginUser,
  postRegisterUser,
  putRegisterUser,
} from "../../controllers/auth.js";

const authRouter = Router();

// /api/v1/auth/register
authRouter.post("/register", postRegisterUser);

// /api/v1/auth/login
authRouter.post("/login", loginUser);

export { authRouter };
