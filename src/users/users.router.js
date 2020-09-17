const { Router } = require("express");
const router = Router();
const Joi = require("joi");
const {
  Types: { ObjectId },
} = require("mongoose");
const controller = require("./users.controller");
const { validate } = require("../helpers/validate");

const userSchema = Joi.object({
  userId: Joi.string()
    .custom((value, helpers) => {
      const isValidObjectId = ObjectId.isValid(value);
      if (!isValidObjectId) {
        return helpers.error("Invalid user id. Must be object id");
      }
      return value;
    })
    .required(),
});

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  subscription: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string().valid(""),
});
router.post("/", validate(createContactSchema), controller.addContact);

router.get("/", controller.listContacts);

router.get("/:contactId", controller.getById);

const updateContactSchema = Joi.object({
  email: Joi.string(),
  username: Joi.string(),
}).min(1);
router.put(
  "/:contactId",
  validate(updateContactSchema),
  controller.updateContact
);

router.delete("/:contactId", controller.removeContact);

exports.usersRouter = router;
