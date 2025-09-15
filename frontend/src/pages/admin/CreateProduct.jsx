import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiUploadCloud, FiTrash2, FiLoader, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { FaBoxes, FaTags, FaDollarSign, FaFileAlt } from "react-icons/fa";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    tags: "",
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/category/get-all-categories`);
        setCategories(response.data.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setStatus({ type: "error", message: "Failed to load categories." });
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imagePreviews.length > 5) {
      setStatus({ type: "error", message: "You can upload a maximum of 5 images." });
      return;
    }
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setStatus({ type: "", message: "" });
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("quantity", formData.quantity);
    form.append("tags", formData.tags);

    formData.images.forEach((image) => {
      form.append("images", image);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/create-product`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setStatus({ type: "success", message: response.data.message });
      // Reset form after successful creation
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        tags: "",
        images: [],
      });
      setImagePreviews([]);
    } catch (err) {
      console.error("Error creating product:", err);
      const errorMessage = err.response?.data?.message || "Failed to create product. Please try again.";
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-slate-50 font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 md:p-10 border border-blue-100">
        <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-6">
          Create New Product 🛍️
        </h2>

        {status.message && (
          <div className={`p-4 mb-6 rounded-lg text-sm font-medium flex items-center gap-2 ${
            status.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {status.type === "success" ? <FiCheckCircle /> : <FiAlertTriangle />}
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label htmlFor="name" className="block text-sm font-semibold text-blue-800 mb-1">
                Product Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Wireless Bluetooth Headphones"
                  className="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="col-span-1">
              <label htmlFor="price" className="block text-sm font-semibold text-blue-800 mb-1">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaDollarSign />
                </span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="99.99"
                  min="0.01"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label htmlFor="category" className="block text-sm font-semibold text-blue-800 mb-1">
                Category
              </label>
              <div className="relative">
                <FaBoxes className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-1">
              <label htmlFor="quantity" className="block text-sm font-semibold text-blue-800 mb-1">
                Quantity
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 150"
                  min="0"
                  className="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-blue-800 mb-1">
              Description
            </label>
            <div className="relative">
              <FaFileAlt className="absolute left-3 top-4 text-gray-400" />
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Write a detailed description of the product..."
                className="w-full pl-8 pr-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              ></textarea>
            </div>
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-semibold text-blue-800 mb-1">
              Tags
            </label>
            <div className="relative">
              <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., electronics, audio, gadget (comma-separated)"
                className="w-full pl-8 pr-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-blue-800 mb-2">
              Product Images (Max 5)
            </label>
            <div className="flex flex-wrap items-center gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300 shadow-sm group">
                  <img src={preview} alt={`Product preview ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove image"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
              {imagePreviews.length < 5 && (
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer text-blue-600 hover:text-blue-800 transition-colors">
                  <FiUploadCloud className="text-3xl" />
                  <span className="mt-1 text-xs text-center">Upload</span>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin mr-2 text-xl" />
            ) : (
              <FiPlus className="mr-2 text-xl" />
            )}
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;