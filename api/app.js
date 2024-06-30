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

// app.use(function (req, res, next) {
//   console.log(req.method, req.originalUrl);
//   // res.send("two");
//   return;
//   next();
// });

//for maintaince
//as we not provided the next() so the other midlleware will not runs
//and the middleware chian will be exited after sending the request
//return statement will send the res and exits the middleware chain
// app.use(function (req, res, next) {
//   return res.status(503).send("The Server is Down,Please try  agian later");
// });
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
