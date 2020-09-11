const model = require("./users.model");

exports.listContacts = async (req, res, next) => {
  try {
    const users = await model.findUsers();

    res.set("Content-Type", "application/json");
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const user = await model.getById(contactId);

    if (!user) {
      return res.status(404).send({ message: "Not found" });
    }

    res.set("Content-Type", "application/json");
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

exports.addContact = async (req, res, next) => {
  try {
    const newUser = await model.addContact(req.body);

    if (!newUser) {
      return res.status(400).send({ message: "Missing required name field" });
    }

    res.set("Content-Type", "application/json");
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
};

exports.removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deleteUser = await model.removeContact(contactId);
    if (!deleteUser) {
      return res.status(404).send({ message: "Not found" });
    }

    res.set("Content-Type", "application/json");
    res.status(200).send({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const user = await model.getById(contactId);
    if (!user) {
      return res.status(404).send({ message: "Not found" });
    }

    const updatedUser = await model.updateUser(contactId, req.body);
    if (!updatedUser) {
      return res.status(400).send({ message: "Missing fields" });
    }

    res.set("Content-Type", "application/json");
    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};
