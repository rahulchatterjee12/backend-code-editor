require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  AppErrorHandler,
  LostErrorHandler,
} = require("./config/exceptionHandlers/handler.js");
const routes = require("./routes");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
// 1.Database , app and PORT setup
const dbConnection = require("./dbConn/mongoose");

const app = express();
const PORT = process.env.PORT || 8000;

// 2.Handle CORS Error
app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());

// 3. Testing APIs

app.get("/", (req, res) => {
  res.send("Working fine");
});

app.use("/api", routes);

// 4. APPLICATION ERROR HANDLING
app.all("*", function (req, res, next) {
  // Forward to next closest middleware
  next();
});
app.use(LostErrorHandler); // 404 error handler middleware
app.use(AppErrorHandler); // General app error handler

app.on("ready", () => {
  app.listen(PORT, () => {
    console.log(`Server is running in port -${PORT}`);
  });
});

dbConnection.then(() => {
  console.log("----Database is connected----");
  app.emit("ready");
});
