const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { createCategory, getAllCategories } = require("../controllers/categoryController");
const { auth, isAdmin } = require("../middleware/authn");

router.post("/create-category",auth,isAdmin, upload.single("categoryImage"), createCategory);
router.get("/get-all-categories", getAllCategories)
module.exports = router;