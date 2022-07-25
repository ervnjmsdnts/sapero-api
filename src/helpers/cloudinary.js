const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dnu26lfxx",
  api_key: "918513779441541",
  api_secret: "pqxQt5idAfQPRyWumP4qZ31-n1k",
});

module.exports = { cloudinary };