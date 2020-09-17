const MongoClient = require("mongodb").MongoClient;

async function main() {
  const connection = await MongoClient.connect(process.env.MONGODB_URL);

  const db = connection.db("hw03");
  const collection = db.collection("contacts");

  // const users = await collection.find().toArray();

  // await collection.insertOne({
  //   _id: users.length + 1,
  //   name: "вероника",
  //   phone: "0975452911",
  //   age: 25,
  // });

  // await collection.updateOne({ _id: 1 }, { $set: { country: "Ukraine" } });

  // await collection.deleteOne({ _id: 2 });

  console.log(await collection.findOne({ _id: users.length + 1 }));
}
main();
