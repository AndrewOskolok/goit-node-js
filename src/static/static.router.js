// const { Router } = require("express");
const express = require("express");
const Joi = require("joi");

const router = express.Router();

router.get("/static", express.static(__dirname, "/public"));

exports.staticRouter = router;
