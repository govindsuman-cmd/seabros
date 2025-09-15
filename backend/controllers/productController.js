// controllers/productController.js
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity,tags } = req.body;
    const imageFiles = req.files ? req.files["images"] : null;

    // Validate required fields
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate price
    if (price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    // Validate quantity
    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    // Validate category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Validate images
    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ message: "At least one product image is required" });
    }

    // Limit to 5 images
    if (imageFiles.length > 5) {
      return res.status(400).json({ message: "You can upload up to 5 images only" });
    }

    // Upload each image to Cloudinary
    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const url = await uploadImageToCloudinary(file.path, "products");
        return url;
      })
    );

    // Generate slug from product name
    const slug = slugify(name, { lower: true, strict: true });

    let parsedTags = [];
    if (Array.isArray(tags)) {
      parsedTags = tags;
    } else if (typeof tags === "string" && tags.trim() !== "") {
      parsedTags = tags.split(",").map(tag => tag.trim());
    }

    // Check for duplicate product by slug
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this name already exists" });
    }

    // Create new product
    const product = new Product({
      name,
      slug,
      description,
      price,
      category,
      tags: parsedTags,
      quantity,
      images: imageUrls, // store Cloudinary URLs
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProductCategoryWise = async (req, res) => {
  try {
    const { categoryId, limit, order } = req.params;

    // Validate category exists
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Fetch products by category
    const products = await Product.find({ category: categoryId })
    .sort({ createdAt: parseInt(order) || -1 }).limit(parseInt(limit) || 10);

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
}