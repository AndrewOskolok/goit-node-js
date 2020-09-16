const path = require("path");
const fs = require("fs");

const contactsPath = path.join(__dirname, "../db/contacts.json");

exports.findUsers = async function () {
  const data = await fs.promises.readFile(contactsPath, "utf8");

  return data;
};

exports.getById = async function (contactId) {
  const data = await fs.promises.readFile(contactsPath, "utf8");
  const allObj = JSON.parse(data);
  const foundUser = allObj.find((el) => el.id === Number(contactId));

  return foundUser;
};

exports.addContact = async function ({ name, email, phone }) {
  let newUserObj;

  if (name && email && phone) {
    const data = await fs.promises.readFile(contactsPath, "utf8");
    const allObj = JSON.parse(data);
    const nextId = allObj[allObj.length - 1].id + 1;
    newUserObj = {
      id: nextId,
      name,
      email,
      phone,
    };
    const newObj = [...allObj, newUserObj];
    const objectToString = JSON.stringify(newObj, null, " ");
    await fs.promises.writeFile(contactsPath, objectToString);
  }

  return newUserObj;
};

exports.removeContact = async function (contactId) {
  const data = await fs.promises.readFile(contactsPath, "utf8");
  const allObj = JSON.parse(data);
  const newObj = allObj.filter((el) => el.id !== Number(contactId));
  const objectToString = JSON.stringify(newObj, null, " ");
  await fs.promises.writeFile(contactsPath, objectToString);

  return allObj.length !== newObj.length;
};

exports.updateUser = async function (contactId, body) {
  let newUserObj;

  if (body) {
    const data = await fs.promises.readFile(contactsPath, "utf8");
    const allObj = JSON.parse(data);
    const foundUser = allObj.find((el) => el.id === Number(contactId));
    const updatedUser = { ...foundUser, ...body };
    const updatedObj = allObj.map((el) =>
      el.id === Number(contactId) ? { ...el, ...updatedUser } : { ...el }
    );

    const objectToString = JSON.stringify(updatedObj, null, " ");
    await fs.promises.writeFile(contactsPath, objectToString);

    newUserObj = updatedUser;
  }

  return newUserObj;
};
