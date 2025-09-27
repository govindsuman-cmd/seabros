// controllers/paymentController.js
const razorpayInstance = require("../config/razorpay");
const crypto = require("crypto");
const Job =require("../models/jobModel")
const Application = require("../models/applicationModel");
const { v4: uuidv4 } = require('uuid');

exports.createOrder = async (req, res) => {
  try {
    const { jobId } = req.body;

    // Fetch job fee
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const options = {
      amount: job.applicationFee * 100, // in paise
      currency: "INR",
      receipt: `job_${job._id}_user_${userId}_${uuidv4()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID, // send to frontend
      jobId: job._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, jobId, userId } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // ✅ Payment verified → save application
      const application = new Application({
        job: jobId,
        user: userId,
        paymentId: razorpay_payment_id,
        status: "Submitted",
      });
      await application.save();

      return res.json({ success: true, message: "Application submitted successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

