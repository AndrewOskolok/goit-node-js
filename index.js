const listContacts = require("./contacts.js");

//index.js
const argv = require("yargs").argv;

//TODO:  рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts.get();
      break;

    case "get":
      listContacts.getId(id);
      break;

    case "add":
      listContacts.addId(name, email, phone);
      break;

    case "remove":
      listContacts.removeId(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
