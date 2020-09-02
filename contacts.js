const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contats.json");

module.exports.get = function listContacts() {
  //read file
  fs.readFile(contactsPath, "utf8", function (error, data) {
    const allObj = JSON.parse(data);
    //push data in console
    console.table(allObj);
  });
};

module.exports.getId = function getContactById(contactId) {
  //read file
  fs.readFile(contactsPath, "utf8", function (error, data) {
    //parse data to obj
    const allObj = JSON.parse(data);
    //object search by id and push data in console
    console.table(allObj.find((el) => el.id === contactId));
  });
};

module.exports.removeId = function removeContact(contactId) {
  //read file
  fs.readFile(contactsPath, "utf8", function (error, data) {
    //parse data to obj
    const allObj = JSON.parse(data);
    //checking id
    if (allObj.find((el) => el.id === contactId)) {
      //filtered array
      const filterObj = allObj.filter((el) => el.id !== contactId);
      //translate the array into a string
      const objectToString = JSON.stringify(filterObj, null, " ");
      //write new array in file
      fs.writeFile(contactsPath, objectToString, function (error, data) {
        //reread the file and push in console
        fs.readFile(contactsPath, "utf8", function (error, data) {
          //parse data to obj
          const forTable = JSON.parse(data);
          console.table(forTable);
        });
      });
    }
  });
};

module.exports.addId = function addContact(name, email, phone) {
  //read file
  fs.readFile(contactsPath, "utf8", function (error, data) {
    //parse data to obj
    const allObj = JSON.parse(data);
    //create a new array with old objects and new
    const newObj = [
      ...allObj,
      { id: allObj[allObj.length - 1].id + 1, name, email, phone },
    ];
    //translate the array into a string
    const objectToString = JSON.stringify(newObj, null, " ");
    //write new array in file
    fs.writeFile(contactsPath, objectToString, function (error, data) {
      //reread the file and push in console
      fs.readFile(contactsPath, "utf8", function (error, data) {
        //parse data to obj
        const forTable = JSON.parse(data);
        console.table(forTable);
      });
    });
  });
};
