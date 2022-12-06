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
const mainRoute = require("./routes/main");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const keywordRoute = require("./routes/keyword");
const productCategoryRoute = require("./routes/productCategory");
const phoneStateRoute = require("./routes/phoneState");
const orderDetailRoute = require("./routes/orderDetail")
const authRoute = require("./routes/auth")
const packageRoute = require("./routes/package")

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api/session", sessionRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/keyword", keywordRoute);
app.use("/api/productCategory", productCategoryRoute);
app.use("/api/phoneState", phoneStateRoute);
app.use("/api/order-detail", orderDetailRoute);
app.use("/api/auth", authRoute);
app.use("/api/package", packageRoute);
app.use("/main", mainRoute);
app.use("/", indexRoute);

const listenerCallback = () => {
  whatsapp.init(io);
};

server.listen(PORT_NUMBER, listenerCallback);

nodeCleanup(whatsapp.cleanup);

module.exports = app;
