const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const morgan = require("morgan");
const express = require("express");

const { usersRouter } = require("./users/users.router.js");

const cors = require("cors");

exports.Server = class Server {
  constructor() {
    this.app = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
  }

  initRoutes() {
    this.app.use("/api/contacts", morgan("tiny"), usersRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const status = err.status || 500;
      return res.status(status).send(err.message);
    });
  }

  startListening() {
    this.app.listen(process.env.PORT, () => {
      console.log("Started listening on port", process.env.PORT);
    });
  }
};
