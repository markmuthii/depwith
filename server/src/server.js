import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connect-database.js";
import { v1Router } from "./routes/v1/index.js";
import { v2Router } from "./routes/v2/index.js";

dotenv.configDotenv();

connectDB();

const app = express();

app.get("/", (req, res) => {
  console.log("Request received on root path");
  res.json({
    message: "Silence is golden",
  });
});

app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
