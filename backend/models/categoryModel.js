const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true,
        unique: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    slug: { type: String, unique: true, lowercase: true }, 
    categoryImage: {
        type: String, 
    },
    gender: {
        type:String,
        enum:["Male", "Female", "Unisex"],
        required: true,
    }
},{ timestamps: true })

module.exports = mongoose.model("Category", categorySchema);