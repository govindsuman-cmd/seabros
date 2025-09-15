const { cloudinary } = require("../config/cloudinary");

const uploadImageToCloudinary = async (localFilePath, folder, height, quality) => {
  const options = { folder };
  if (height) options.height = height;
  if (quality) options.quality = quality;
  options.resource_type = "auto";

  try {
    const result = await cloudinary.uploader.upload(localFilePath, options);
    return result.secure_url;
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

// ✅ Correct export
module.exports = { uploadImageToCloudinary };
