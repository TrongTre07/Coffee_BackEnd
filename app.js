var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors"); //import cors
const session = require("express-session");
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/api/UserAPI");
var sanPhamRouter = require("./routes/api/SanPhamAPI");
var loaiSanPhamRouter = require("./routes/api/LoaiSanPhamAPI");
var favoriteRouter = require("./routes/api/FavoriteAPI");
var gioHangRouter = require("./routes/api/GioHangAPI");
var chiNhanhRouter = require("./routes/api/ChiNhanhAPI");
var donHangRouter = require("./routes/api/DonHangAPI");
var toppingRouter = require("./routes/api/ToppingAPI");
var voucherRouter = require("./routes/api/VoucherAPI");
var vongQuayRouter = require("./routes/api/VongQuayAPI");
var sanPhamTheoNgayRouter = require("./routes/api/SanPhamTheoNgayAPI");
var notificationRouter = require("./routes/api/FCMNotification");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//khai báo thong tin session, cookie
app.use(
  session({
    secret: "iloveyou",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//khai báo cors
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(">>>>>>>>>> Server is running on port " + PORT + " <<<<<<<<<<");
});

mongoose
  .connect(
    "mongodb+srv://hoatrinh14020:KFPqSyMahPWlJ5qV@coffee.zdrgcwk.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>> DB Error: ", err));

//khai báo router
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/san-pham", sanPhamRouter);
app.use("/api/loai-san-pham", loaiSanPhamRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/gio-hang", gioHangRouter);
app.use("/api/chi-nhanh", chiNhanhRouter);
app.use("/api/don-hang", donHangRouter);
app.use("/api/topping", toppingRouter);
app.use("/api/voucher", voucherRouter);
app.use("/api/vong-quay", vongQuayRouter);
app.use("/api/san-pham-theo-ngay", sanPhamTheoNgayRouter);
app.use("/api/notification", notificationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
