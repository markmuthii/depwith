import { Router } from "express";
import { authRouter } from "./auth.js";
import { requiresAuthentication } from "../../middleware/auth.js";

const v1Router = Router();

// PUBLIC ROUTES (do not require a user to be logged in in order to access them)
// /api/v1
v1Router.get("/", (req, res) => {
  res.send("Hello from v1");
});

// /api/v1/auth
v1Router.use("/auth", authRouter);

// PRIVATE ROUTES (require a user to be logged in in order to access them)
v1Router.use(requiresAuthentication); // This middleware protects ALL routes after it

v1Router.get("/protected", (req, res) => {
  res.json({
    message: "This is a protected route",
  });
});

v1Router.get("/protected2", (req, res) => {
  res.json({
    message: "This is a protected route",
  });
});

v1Router.get("/protected3", (req, res) => {
  res.json({
    message: "This is a protected route",
  });
});

// This is how you'd add authorization
// v1Router.use("/admin", isAdmin, adminRouter);

export { v1Router };
