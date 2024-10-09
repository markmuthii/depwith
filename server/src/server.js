import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log("This is in the middleware");
  next();
});

app.get("/", (req, res, next) => {
  console.log("Request received on root path");
  res.send("Hello World From the server running on Mark's machine!");
});

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
