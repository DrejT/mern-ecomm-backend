// configs
require("dotenv").config();
require("./src/db/mongo.connect");
require("./src/db/redis.connect");
// dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const createError = require("http-errors");
const morgan = require("morgan");
// routes
const authRouter = require("./src/routes/auth.route");
const userRouter = require("./src/routes/user.route");
const adminRouter = require("./src/routes/admin.route");
const storeRouter = require("./src/routes/store.route");
const itemRouter = require("./src/routes/item.route");
const reviewRouter = require("./src/routes/review.route");
const orderRouter = require("./src/routes/order.route");
const { createSession } = require("./src/utils/session");
const upload = require("./src/utils/multer");
const { revalidateUserSession } = require("./src/utils/session");
// express config
const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.DOMAIN_NAME,
  credentials: true,
  preflightContinue: true
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(createSession);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.DOMAIN_NAME);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// routes config
app.get("/", async (req, res) => {
  // console.log(req.session);
  console.log(req.cookies);
  res.send("hello world");
});
app.post("/upload", upload.single("itemImage"), async (req, res, next) => {
  try {
    console.log(req.file);
    next();
  } catch (error) {
    console.log(error);
  }
});

app.use("/session", revalidateUserSession);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/admin/store", storeRouter);
app.use("/admin/item", itemRouter);
app.use("/admin/review", reviewRouter);
app.use("/admin/order", orderRouter);

// error handling
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});

// start server
const server = app.listen(process.env.PORT, () =>
  console.log(`server started on ${process.env.PORT}`)
);

server.timeout = 3000;
