import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connect-database.js";

dotenv.configDotenv();

connectDB();

const app = express();

app.get("/", (req, res) => {
  console.log("Request received on root path");
  res.json({
    message: "Silence is golden",
  });
});

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
