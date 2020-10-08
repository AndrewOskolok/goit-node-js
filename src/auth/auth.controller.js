const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/users.model");
const { createUserAvatar } = require("../helpers/avatarGenerator");
const { avatarCompresHandler } = require("../helpers/avatarCompres");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  const isExistingUser = await UserModel.findOne({ email });

  if (isExistingUser) {
    return res.status(409).send({ status: "Email in use" });
  }

  const hashPassword = await bcryptjs.hash(
    password,
    Number(process.env.BCRYPT_SALT)
  );

  const createdUserAvatar = await createUserAvatar(email, next);

  await avatarCompresHandler(createdUserAvatar, next);

  const newUser = await UserModel.create({
    email,
    password: hashPassword,
    avatarURL: `${process.env.DEFAULT_URL}/images/${createdUserAvatar}`,
  });
  console.log(newUser);
  res.status(201).send({ user: { email, subscription: newUser.subscription } });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  let isCorrect = false;
  if (user) {
    isCorrect = await bcryptjs.compare(password, user.password);
  }

  if (!isCorrect) {
    return res.status(401).send({ status: "Not authorized" });
  }

  const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("token", token, {
    expires: new Date(Date.now() + 86400e3),
    httpOnly: true,
  });
  res.status(201).send({
    token: token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

exports.logout = async (req, res, next) => {
  const { token } = req.cookies;

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).send({ status: "Not authorized" });
  }

  const user = await UserModel.findById(payload.uid);
  if (!user) {
    return res.status(401).send({ status: "Not authorized" });
  }

  res.clearCookie("token");

  res.status(204).send();
};

exports.authorize = async (req, res, next) => {
  const { token } = req.cookies;

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).send({ status: "Not authorized" });
  }

  const user = await UserModel.findById(payload.uid);
  if (!user) {
    return res.status(401).send({ status: "Not authorized" });
  }

  req.user = user;
  next();
};
