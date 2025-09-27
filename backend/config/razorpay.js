// config/razorpay.js
const Razorpay = require("razorpay");

const { RAZORPAY_KEY_ID, RAZORPAY_SECRET } = process.env;

if (!RAZORPAY_KEY_ID || !RAZORPAY_SECRET) {
  // Fail fast so we see this on server start
  throw new Error("Missing Razorpay env vars: RAZORPAY_KEY_ID or RAZORPAY_SECRET");
}

const razorpayInstance = new Razorpay({
  key_id:RAZORPAY_KEY_ID,
  key_secret:RAZORPAY_SECRET,
});


module.exports = razorpayInstance;
