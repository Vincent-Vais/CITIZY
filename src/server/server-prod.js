const regeneratorRuntime = require("regenerator-runtime");
const path = require("path");

const express = require("express"),
  cookieSession = require("cookie-session"),
  mongoose = require("mongoose"),
  apiRouter = require("./routes/api");

require("dotenv").config();

const PORT = process.env.PORT || 3000,
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "index.html");

const _ = require("./helpers/helpers");

const log4js = require("log4js");
log4js.configure({
  appenders: {
    index: { type: "file", filename: "logs.log" },
    helpers: { type: "file", filename: "logs.log" },
    api: { type: "file", filename: "logs.log" },
  },
  categories: {
    default: { appenders: ["index"], level: "trace" },
    debug: { appenders: ["helpers"], level: "trace" },
    trace: { appenders: ["api"], level: "trace" },
  },
});
log4js.getLogger().level = "off";

const log = log4js.getLogger("index");

const app = express();

mongoose
  .connect(process.env.DATABASEURL || "mongodb://localhost:27017/scr_api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    log.info("Connected to db");
  })
  .catch((err) => {
    log.fatal("Failed to connect to db");
    log.error(err);
  });
mongoose.set("useFindAndModify", false);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

// app.use(express.static(__dirname + "/dist"));
// app.use(express.static(__dirname + "/dist/public"));
// app.use(express.static(__dirname + "/dist/views"));
app.use(express.static(DIST_DIR));

app.use("/api/results", apiRouter);

app.get("/", (req, res, next) => {
  log.info("Reached home page");
  res.sendFile(HTML_FILE);
});

app.listen(PORT, () => {
  log.info("Server has started");
  log.info("Setting up a timer");
  _.setTime();
});
