const path = require("path");
const fsPromises = require("fs").promises;
const { avatarCompresHandler } = require("../helpers/avatarCompres");
const { UserModel } = require("./users.model");

exports.getLoggedUser = (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).send({
    email,
    subscription,
  });
};

exports.updateSubUser = async (req, res, next) => {
  const { email, subscription } = req.body;

  const updatedUser = await UserModel.findOneAndUpdate(
    { email },
    { subscription },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).send(`User ${email} not found`);
  }

  res.status(200).send(`User subscription update to ${subscription}`);
};

exports.updateAvatarUser = async (req, res, next) => {
  const currentUser = req.user;
  const fileName = req.file.filename;

  if (req.file.mimetype.includes("image")) {
    await avatarCompresHandler(fileName, next);

    const user = await UserModel.findOne(currentUser._id);

    const oldNameAvatar = user.avatarURL.slice(-13);

    await fsPromises.unlink(
      path.join(__dirname + `../../../public/images/${oldNameAvatar}`)
    );

    const newUrl = `http://localhost:3000/images/${fileName}`;

    await UserModel.findByIdAndUpdate(currentUser._id, {
      avatarURL: newUrl,
    });

    res.status(200).send({ avatarURL: newUrl });
  } else {
    res.status(400).json({ message: "Invalid file type" });
  }
};
