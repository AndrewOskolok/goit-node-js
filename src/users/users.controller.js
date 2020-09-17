const { ContactModel } = require("./users.model");

exports.addContact = async (req, res, next) => {
  try {
    const newUser = await ContactModel.create({ ...req.body });

    if (!newUser) {
      return res.status(400).send({ message: "Missing required name field" });
    }

    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
};

exports.listContacts = async (req, res, next) => {
  try {
    const users = await ContactModel.find();

    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const user = await ContactModel.findById(contactId);

    if (!user) {
      return res.status(404).send({ message: "Not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const updatedUser = await ContactModel.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deleteUser = await ContactModel.findByIdAndDelete(contactId);
    if (!deleteUser) {
      return res.status(404).send({ message: "Not found" });
    }

    res.status(200).send({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};
