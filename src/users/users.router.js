const { Router } = require("express");
const Joi = require("joi");
const { validate } = require("../helpers/validate");
const { upload } = require("../helpers/avatarWriter");
const { wrapTryCatch } = require("../helpers/wrapTryCatch");
const { authorize } = require("../auth/auth.controller");
const {
  getLoggedUser,
  updateSubUser,
  updateAvatarUser,
} = require("../users/users.controller");

const router = Router();

const updateSubSchema = Joi.object({
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("free", "pro", "premium").required(),
});

router.get("/current", authorize, getLoggedUser);

router.patch("/", validate(updateSubSchema), wrapTryCatch(updateSubUser));

router.patch(
  "/avatar",
  authorize,
  upload.single("avatar"),
  wrapTryCatch(updateAvatarUser)
);

exports.usersRouter = router;
