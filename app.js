const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
var port = process.env.PORT || 3000;
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

//Body Parser Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//Routers Required
const indexRouter = require("./routes/index");
const contactRouter = require("./routes/contact");
const scheduleRouter = require("./routes/schedule");
const playerdetailRouter = require("./routes/details");
const loginRouter = require("./routes/login");
const updateRouter = require("./routes/update");
const registerRouter = require("./routes/register");
const playerRouter = require("./routes/player");
const coachRouter = require("./routes/coach");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routers Middleware
app.use("/", indexRouter);
app.use("/home", indexRouter);
app.use("/contact", contactRouter);
app.use("/schedule", scheduleRouter);
app.use("/detail", playerdetailRouter);
app.use("/login", loginRouter);
app.use("/update", updateRouter);
app.use("/register", registerRouter);
app.use("/register/players", playerRouter);
app.use("/register/coach", coachRouter);

//Socket IO Server
io.on("connection", function (socket) {
  socket.on("team1Goal", function (team1Goal) {
    io.emit("team1Goal", team1Goal);
  });
  socket.on("team1player", function (team1player) {
    io.emit("team1player", team1player);
  })
  socket.on("team2Goal", function (team2Goal) {
    io.emit("team2Goal", team2Goal);
  });
});

//Error Page Router
app.use(function (req, res) {
  res.sendFile(__dirname + "/404.html");
});

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

http.listen(port, function () {
  console.log("App Listening On " + port);
});
