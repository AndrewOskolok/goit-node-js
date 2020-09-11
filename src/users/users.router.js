const morgan = require("morgan");
const { Router } = require("express");

const controller = require("./users.controller");

const router = Router();

router.get("/", morgan("tiny"), controller.listContacts);

router.get("/:contactId", morgan("tiny"), controller.getById);

router.post("/", morgan("tiny"), controller.addContact);

router.delete("/:contactId", morgan("tiny"), controller.removeContact);

router.put("/:contactId", morgan("tiny"), controller.updateContact);

exports.usersRouter = router;
