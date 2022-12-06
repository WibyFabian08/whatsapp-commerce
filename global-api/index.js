const express = require("express");
const http = require("http");
const cors = require("cors");
const nodeCleanup = require("node-cleanup");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

require("dotenv").config();

const { PORT_NUMBER } = process.env;
const whatsapp = require("./helpers/whatsapp");

const sessionRoute = require("./routes/session");
const indexRoute = require("./routes/index");
const productRoute = require("./routes/product");

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/global/api/session", sessionRoute);
app.use("/global/api/product", productRoute);
app.use("/", indexRoute);

const listenerCallback = () => {
  whatsapp.init(io);
};

server.listen(PORT_NUMBER, listenerCallback);

nodeCleanup(whatsapp.cleanup);

module.exports = app;
