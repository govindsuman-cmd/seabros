const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");
const { createProduct, getProductCategoryWise } = require("../controllers/productController");

router.post("/create-product", upload.array("photos", 5), createProduct);
router.get("/get-category-products/:slug", getProductCategoryWise);
module.exports = router;