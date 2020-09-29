const { Router } = require("express");
const Joi = require("joi");
const { register, login, logout } = require("./auth.controller");
const { validate } = require("../helpers/validate");

const router = Router();

const regLogSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

router.post("/register", validate(regLogSchema), register);

router.post("/login", validate(regLogSchema), login);

router.post("/logout", logout);

exports.authRouter = router;
