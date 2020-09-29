const { Router } = require("express");
const Joi = require("joi");
const { validate } = require("../helpers/validate");
const { authorize } = require("../auth/auth.controller");
const { getLoggedUser, updateSubUser } = require("./users.controller");

const router = Router();

const updateSubSchema = Joi.object({
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("free", "pro", "premium").required(),
});

router.get("/current", authorize, getLoggedUser);

router.patch("/", validate(updateSubSchema), updateSubUser);

exports.usersRouter = router;
