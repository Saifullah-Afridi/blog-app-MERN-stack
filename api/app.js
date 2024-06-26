const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/globalErrorHandler");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 3000;

app.listen(process.env.port || port, () => {
  console.log("The server is listening on port " + port);
});
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);

// middleware for unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError("Can not find " + req.originalUrl));
});

//global error handler
app.use(globalErrorHandler);
