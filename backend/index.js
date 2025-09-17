const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { cloudinaryConnect } = require("./config/cloudinary");
dotenv.config();

const app = express();

// Security + logging middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cloudinary connection
cloudinaryConnect();

// ✅ Proper CORS config (only allow your frontend)
const allowedOrigins = [
  "https://seabros-frontend.onrender.com",
  "https://seabrospvtltd.in", // custom domain for frontend
];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Handle preflight requests (OPTIONS) for API routes
app.options("/api/*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Database connection
require("./config/database").connect();

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1/product", require("./routes/productRoute"));
app.use("/api/v1/category", require("./routes/categoryRoute"));
app.use("/api/v1/candidates", require("./routes/candidateRoute"));
app.use("/api/v1/jobs", require("./routes/jobRoute"));
app.use("/api/v1/user", require("./routes/userRoute"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: `Something went wrong! ${err.message}` });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
