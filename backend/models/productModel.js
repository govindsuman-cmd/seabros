const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },  
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    tags: {
        type: [String],
        index: true
    },
    images: [{
        type: String   // Store Cloudinary/S3 URLs
    }]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
