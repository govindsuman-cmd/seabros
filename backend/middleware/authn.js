//auth,isCustomer,isAdmin
const dotenv=require("dotenv")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/userModel");
dotenv.config();

exports.auth = async (req, res, next) => {
  try {
      // Log the request headers to see if Authorization header is present

      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
          return res.status(401).json({
              success: false,
              message: 'Authentication token is missing.',
          });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({
          success: false,
          message: 'Invalid token.',
      });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role: ${req.user.role} is not allowed to access this resource`,
      });
    }
    next();
  };
};



exports.isCustomer= async (req,res,next)=>{
  try {
    const  userDetails= await User.findOne({email:req.user.email});
    if(userDetails.role!=="Customer"){
      return res.status(401).json({
        success:false,
        message:"This route is protected for Customer"
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Customer request failed"
    })
  }
}

exports.isEmployee= async (req,res,next)=>{
  try {
    const  userDetails= await User.findOne({email:req.user.email});
    if(userDetails.role!=="Employee"){
      return res.status(401).json({
        success:false,
        message:"This route is protected for Employee"
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Employee request failed"
    })
  }
}

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({email:req.user.email});
    if (user.role !== 'Admin') {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error:error.message,
      message: "Error in admin middelware",
    });
  }
};