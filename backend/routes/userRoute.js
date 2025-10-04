const express= require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { login, signup, changePassword } = require("../controllers/authController");
const { auth } = require("../middleware/authn");

router.post("/login", login);
router.post("/signup", signup);
router.put("/change-password",auth, changePassword);

module.exports = router;