const Candidate = require("../models/candidateModel");
const  {uploadImageToCloudinary}  = require("../utils/imageUploader");
const Job = require("../models/jobModel");

exports.createCandidate = async (req, res, next) => {
  try {
    const {
      name,
      age,
      email,
      nationality,
      qualification,
      experience,
      experienceAs,
      address,
      date,
      time,
      skills,
      jobId, // ✅ job applied for
    } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if candidate already applied with same email for this job
    const existingCandidate = await Candidate.findOne({ email, jobAppliedFor: jobId });
    if (existingCandidate) {
      return res.status(400).json({ message: "Candidate already applied for this job" });
    }

    // Files check
    const resumeFile = req.files?.['resume']?.[0];
    const idProofFile = req.files?.['idProof']?.[0];
    const domicileFile = req.files?.['domicile']?.[0];

    if (!resumeFile || !idProofFile || !domicileFile) {
      return res.status(400).json({ message: "Resume, ID Proof, and Domicile are required" });
    }

    // Upload files in parallel
    const [resumeUrl, idProofUrl, domicileUrl] = await Promise.all([
      uploadImageToCloudinary(resumeFile.path, "resumes"),
      uploadImageToCloudinary(idProofFile.path, "idProofs"),
      uploadImageToCloudinary(domicileFile.path, "domiciles"),
    ]);

    // Create candidate
    const candidate = new Candidate({
      name,
      age: Number(age),
      email,
      skills: Array.isArray(skills) ? skills : skills?.split(",").map(s => s.trim()) || [],
      experience: isNaN(experience) ? 0 : Number(experience),
      experienceAs: experienceAs?.trim() || "Fresher",
      qualification,
      idProof: idProofUrl,
      address,
      nationality,
      domicile: domicileUrl,
      interviewDate: new Date(`${date}T${time}`),
      resume: resumeUrl,
      jobAppliedFor: jobId, // ✅ Linked job
    });

    await candidate.save();

    res.status(201).json({
      success: true,
      message: "Candidate created successfully",
      candidate,
    });

  } catch (error) {
    if (error.code === 11000 && error.keyValue?.email) {
      return res.status(400).json({ message: "Email already exists" });
    }
    next(error); // centralized error handler
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