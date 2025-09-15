const slugify = require("slugify"); // npm i slugify
const Category = require("../models/categoryModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createCategory = async (req, res) => {
  try {
    const { name, gender, description } = req.body;
    const categoryImage = req.file;

    // Basic validation
    if (!name || !categoryImage) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    // Validate gender
    const validGenders = ["Male", "Female", "Unisex"];
    if (!validGenders.includes(gender)) {
      return res
        .status(400)
        .json({ message: "Invalid gender. Must be Male, Female, or Unisex." });
    }

    // Generate slug from category name
    const slug = slugify(name, { lower: true, strict: true });

    // Check if slug already exists (avoid duplicates)
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(categoryImage.path, "categories");

    // Create category
    const category = new Category({
      name,
      slug,
      gender,
      description,
      categoryImage: imageUrl, // store Cloudinary URL
    });

    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    let { limit, order } = req.query; // take from query params
    limit = parseInt(limit) || 10;    // default = 10
    order = parseInt(order) || -1;    // default = -1 (latest first)

    const categories = await Category.find()
      .sort({ createdAt: order })  
      .limit(limit);

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
};
