const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { cloudinaryConnect } = require("./config/cloudinary");
dotenv.config();
const app = express();

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
cloudinaryConnect(); // 👉 invoking the function here
app.use(
  cors({
    origin: ['http://localhost:5173'], // adjust for prod
    credentials: true,
  })
);
// Database connection
require("./config/database").connect();

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

const productRoute = require("./routes/productRoute");
app.use("/api/v1/product", productRoute);

const categoryRoute = require("./routes/categoryRoute");
app.use("/api/v1/category", categoryRoute);

const candidateRoute = require("./routes/candidateRoute");
app.use("/api/v1/candidates", candidateRoute);

const jobRoute = require("./routes/jobRoute");
app.use("/api/v1/jobs", jobRoute);

const userRoute = require("./routes/userRoute");
app.use("/api/v1/user", userRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: `Something went wrong! ${err.message}` });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
