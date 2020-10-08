const AvatarGenerator = require("avatar-generator");
const path = require("path");
const shortid = require("shortid");

exports.createUserAvatar = async (email, next) => {
  try {
    const AG = new AvatarGenerator();
    const createdAvatar = await AG.generate(email, "male");
    const generatedId = shortid.generate();

    await createdAvatar
      .png()
      .toFile(path.join(__dirname + `../../../tmp/${generatedId}.jpg`));

    return `${generatedId}.jpg`;
  } catch (err) {
    next(err);
  }
};
