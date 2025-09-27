const Candidate = require("../models/candidateModel");
const Job = require("../models/jobModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const razorpayInstance = require("../config/razorpay"); // Razorpay instance
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

exports.createCandidatePaymentOrder = async (req, res, next) => {
  try {
    const { jobId, email } = req.body;

    if (!jobId || !email) return res.status(400).json({ message: "Job ID and Email are required" });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Candidate already applied?
    const existingCandidate = await Candidate.findOne({ email, jobAppliedFor: jobId });
    if (existingCandidate) return res.status(400).json({ message: "Candidate already applied for this job" });

   const shortEmail = email.split("@")[0]; // only username part
const receipt = `job_${job._id}_${shortEmail}_${Date.now()}`.slice(0, 40);

    // Create Razorpay order
    const order = await razorpayInstance.orders.create({
      amount: job.applicationFee * 100, // in paise
      currency: "INR",
      receipt,
    });

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
      receipt,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error creating payment order ${error.message}`,
      error: error.message,
    });
  }
};

exports.verifyPaymentAndCreateCandidate = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, receipt, jobId } = req.body;

    // Verify payment
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Files
    const resumeFile = req.files?.resume?.[0];
    const idProofFile = req.files?.idProof?.[0];
    const domicileFile = req.files?.domicile?.[0];

    if (!resumeFile || !idProofFile || !domicileFile) {
      return res.status(400).json({ message: "Resume, ID Proof, and Domicile are required" });
    }

    // Upload files
    const [resumeUrl, idProofUrl, domicileUrl] = await Promise.all([
      uploadImageToCloudinary(resumeFile.path, "resumes"),
      uploadImageToCloudinary(idProofFile.path, "idProofs"),
      uploadImageToCloudinary(domicileFile.path, "domiciles"),
    ]);

    // Create candidate
    const candidate = new Candidate({
      name: req.body.name,
      age: Number(req.body.age),
      email: req.body.email,
      experience: Number(req.body.experience),
      skills: Array.isArray(req.body.skills)
        ? req.body.skills
        : req.body.skills?.split(",").map(s => s.trim()) || [],
      qualification: req.body.qualification,
      idProof: idProofUrl,
      address: req.body.address,
      nationality: req.body.nationality,
      domicile: domicileUrl,
      interviewDate: new Date(`${req.body.date}T${req.body.time}`),
      resume: resumeUrl,
      jobAppliedFor: jobId,
      paymentId: razorpay_payment_id,
      paymentStatus: "Completed",
      receipt,
    });

    await candidate.save();
    console.log("Candidate created:", candidate);
    res.status(201).json({
      success: true,
      message: "Candidate application submitted successfully",
      candidate,
    });

  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({
      success: false,
      message: `Error creating candidate application ${error.message}`,
      error: error.message,
    });
  }
};


exports.getAllCandidate = async (req, res) => {
  try {
    // Get page & limit from query params (default: page=1, limit=10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = parseInt(req.query.order) || -1; // +1 => oldest first, -1 => latest first
    const skip = (page - 1) * limit;

    // Fetch candidates with pagination
    const candidates = await Candidate.find()
      .skip(skip)
      .sort({ createdAt: order })
      .limit(limit);

    // Total count for frontend
    const total = await Candidate.countDocuments();

    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalCandidates: total,
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching candidates",
      error: error.message,
    });
  }
};


exports.getCandidateJobWise = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = parseInt(req.query.order) || -1; // +1 => oldest first, -1 => latest first
    const skip = (page - 1) * limit;

    const { jobId } = req.params;
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    } 
    const candidates = await Candidate.find({ jobAppliedFor: jobId })
    .sort({ createdAt: order })
    .skip(skip)
    .limit(limit);

    res.status(200).json({
      success: true,
      totalCandidates: candidates.length,
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching candidates for the job",
      error: error.message,
    });
  } 
};

exports.getSingleCandidate = async (req, res, next) => {
  try {
    const { id } = req.params; // Candidate ID from URL
    const candidate = await Candidate.findById(id).populate('jobAppliedFor');
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }
    res.status(200).json({
      success: true,
      candidate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching candidate",
      error: error.message
    });
  }
};

exports.deleteCandidate = async (req, res, next) => {
  try {
    const { id } = req.params; // Candidate ID from URL
    const candidate = await Candidate.findByIdAndDelete(id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    } 
    res.status(200).json({
      success: true,
      message: "Candidate deleted successfully"
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting candidate",
      error: error.message
    });
  }
};

exports.shortlistCandidate = async (req, res, next) => {
  try {
    const { id } = req.params; // Candidate ID from URL
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }
    candidate.status = "Approved";
    await candidate.save();
    res.status(200).json({  
      success: true,
      message: "Candidate shortlisted successfully",
      candidate
    });
  } catch (error) {
    res.status(500).json({
      success: false,   
      message: "Error shortlisting candidate",
      error: error.message
    });
  }
};

exports.rejectCandidate = async (req, res, next) => {
  try {
    const { id } = req.params; // Candidate ID from URL
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    } 
    candidate.status = "Rejected";
    await candidate.save();
    res.status(200).json({
      success: true,
      message: "Candidate rejected successfully",
      candidate
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: "Error rejecting candidate",
      error: error.message
    });
  }
};