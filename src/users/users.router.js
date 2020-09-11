const { Router } = require("express");

const controller = require("./users.controller");

const router = Router();

router.get("/", controller.listContacts);

router.get("/:contactId", controller.getById);

router.post("/", controller.addContact);

router.delete("/:contactId", controller.removeContact);

router.put("/:contactId", controller.updateContact);

exports.usersRouter = router;
