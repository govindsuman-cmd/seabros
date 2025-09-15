const multer = require("multer");
const path = require("path");

// Multer storage (store file temporarily before Cloudinary upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tempUploads/"); // temporary folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

// File filter (accept only pdf/doc/images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|jpeg|jpg|png|webp|.avif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX, JPG, JPEG, PNG files allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 5 MB limit
});

module.exports = upload;
