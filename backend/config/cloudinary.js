const cloudinary = require("cloudinary").v2;
require("dotenv").config();

function cloudinaryConnect() {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  console.log("✅ Cloudinary connected");
}

module.exports = {
  cloudinaryConnect,  // function to call in index.js
  cloudinary          // the configured cloudinary instance
};
