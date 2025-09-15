const User=require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup=async(req,res)=>{
    try{
       const { name, email, password, phone, address, role } = req.body || {};
        console.log("REQ BODY:", req.body);
       switch (true) {
  case !name:
    return res.status(403).json({
      success: false,
      message: "Name is required",
    });

  case !email:
    return res.status(403).json({
      success: false,
      message: "Email is required",
    });

  case !password:
    return res.status(403).json({
      success: false,
      message: "Password is required",
    });

  case !phone:
    return res.status(403).json({
      success: false,
      message: "Phone is required",
    });

  case !address:
    return res.status(403).json({
      success: false,
      message: "Address is required",
    });

  case !role:
    return res.status(403).json({
      success: false,
      message: "Role is required",
    });

  default:
    break; // if all fields are present, continue
}

      //  if (password !== confirmPassword) {
      //   return res.status(400).json({
      //     success: false,
      //     message:
      //       "Password and Confirm Password do not match. Please try again.",
      //   })
      // }
       const existingUser=await User.findOne({email});
       if(existingUser){
        res.status(400).json({
            success:false,
            message:'User already exists'
        })
       }
       let hashedPassword;
       try{
        hashedPassword=await bcrypt.hash(password,10)
       }catch(error){
        res.status(400).json({
            success:false,
            message:`Error in hashing password, ${error.message}`
        })
       }
       const user = await User.create({
        name,email,password:hashedPassword,phone,address,role
       })
       return res.status(201).json({
        success:true,
        message:'user registered successfully'
       })
    }catch(error){
        console.error(error);
        return res.status(401).json({
            success:false,
            message:`${error.message}`,
        });
    }
}

exports.login=async (req,res)=>{
    try{
      const { email,password }=req.body;
      if(!email||!password){
        return res.status(401).json({
            success:false,
            message:'please fill both field'
        })
      }
      let user= await User.findOne({email})
      if(!user){
        return res.status(401).json({
            success:false,
            message:'user is not registered'
        })
      }
      const payload={
        email:user.email,
        id:user._id,
        role:user.role
      }
      if(await bcrypt.compare(password,user.password)){
         let token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
         });
            user = user.toObject();
            user.token = token;
            user.password = undefined;

         const options={
            expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly:true,
         }
         res.cookie("token",token,options).status(200).json({
            success:true,
            token:user.token,
            user,
            message:'user logged in successfully'
         })
      }else{
        return res.status(403).json({
            success:false,
            message:'password incorrect'
        })
      }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
