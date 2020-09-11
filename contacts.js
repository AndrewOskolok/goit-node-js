const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contats.json");

module.exports.get = async function () {
  try {
    //read file
    const data = await fs.promises.readFile(contactsPath, "utf8");
    //parse data to obj
    const allObj = JSON.parse(data);
    //push data in console
    console.table(allObj);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.getId = async function (contactId) {
  try {
    //read file
    const data = await fs.promises.readFile(contactsPath, "utf8");
    //parse data to obj
    const allObj = JSON.parse(data);
    //object search by id
    const foundUser = allObj.find((el) => el.id === contactId);
    //push foundUser to console or error message
    console.table(foundUser ? foundUser : { message: "User not found" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.removeId = async function (contactId) {
  try {
    //read file
    const data = await fs.promises.readFile(contactsPath, "utf8");
    //parse data to obj
    const allObj = JSON.parse(data);
    //checking id
    if (isNaN(contactId)) {
      console.log({ message: "Invalid id entry" });
    } else if (allObj.find((el) => el.id === contactId)) {
      //filtered array
      const filterObj = allObj.filter((el) => el.id !== contactId);
      //translate the array into a string
      const objectToString = JSON.stringify(filterObj, null, " ");
      //write new array in file
      await fs.promises.writeFile(contactsPath, objectToString);
      //push successful answer to console
      console.table({ message: `User ${contactId} successful delete` });
    } else {
      //push bad answer to console
      console.table({ message: "User id not found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.addId = async function (name, email, phone) {
  try {
    let newUserObj = { message: "Missing required name field" };

    if (name && email && phone) {
      //read file
      const data = await fs.promises.readFile(contactsPath, "utf8");
      //parse data to obj
      const allObj = JSON.parse(data);
      //create user object
      newUserObj = {
        id: allObj[allObj.length - 1].id + 1,
        name,
        email,
        phone,
      };
      //add newUserObject to userArrey
      const newObj = [...allObj, newUserObj];
      //translate the array into a string
      const objectToString = JSON.stringify(newObj, null, " ");
      //write new array in BD
      await fs.promises.writeFile(contactsPath, objectToString);
    }
    //push answer to console
    console.table(newUserObj);
  } catch (error) {
    console.log(error.message);
  }
};
