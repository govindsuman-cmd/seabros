const Job=require('../models/jobModel');

exports.createJob = async (req, res, next) => {
    try {
        const { title, description, jobVacancies, requirements, location, salaryRange, jobType, applicationDeadline, skills, applicationFee } = req.body;
        
        const job = new Job({
            title,
            description,
            jobVacancies: isNaN(jobVacancies) ? 1 : Number(jobVacancies),
            requirements: Array.isArray(requirements) ? requirements : requirements?.split(",") || [],
            location,
            salaryRange,    
            jobType,
            applicationFee: isNaN(applicationFee) ? 0 : Number(applicationFee),
            applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
            skills: Array.isArray(skills) ? skills : skills?.split(",") || []
        });
        await job.save();
        res.status(201).json({
            message: "Job created successfully",
            job
        });
    } catch (error) {
        res.status(500).json({
      success: false,
      message: `Error creating job ${error.message}`,
      error: error.message,
    });
    }
};

exports.getAllJobs = async (req, res, next) => {
    try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = parseInt(req.query.order) || -1; // +1 => oldest first, -1 => latest first
    const skip = (page - 1) * limit;

    const jobs = await Job.find().skip(skip)
      .sort({ createdAt: order })
      .limit(limit);
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
       res.status(500).json({
      success: false,
      message: "Error fetching candidates",
      error: error.message,
    });
    }   
};

exports.getSingleJob = async (req, res, next) => {
  try {
    const { id } = req.params; // Job ID from URL
    const job = await Job.findById(id);

    if (!job) {
        return res.status(404).json({   
            success: false,
            message: "Job not found"
        });
    }
    res.status(200).json({
        success: true,
        job
    });
  } catch (error) {
    res.status(500).json({
      success: false,   
        message: "Error fetching job",
        error: error.message
    });
    }
};

// Edit (Update) Job
exports.editJob = async (req, res, next) => {
  try {
    const { id } = req.params; // Job ID from URL
    const {
      title,
      description,
      requirements,
      location,
      jobVacancies,
      applicationFee,
      salaryRange,
      jobType,
      applicationDeadline,
      skills,
    } = req.body;

    // Find job by ID
    let job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Update job fields (only if provided)
    job.title = title || job.title;
    job.applicationFee= applicationFee ? Number(applicationFee) : job.applicationFee;
    job.description = description || job.description;
    job.requirements = requirements
      ? Array.isArray(requirements)
        ? requirements
        : requirements.split(",")
      : job.requirements;
    job.location = location || job.location;
    job.jobVacancies = jobVacancies ? Number(jobVacancies) : job.jobVacancies;
    job.salaryRange = salaryRange || job.salaryRange;
    job.jobType = jobType || job.jobType;
    job.applicationDeadline = applicationDeadline
      ? new Date(applicationDeadline)
      : job.applicationDeadline;
    job.skills = skills
      ? Array.isArray(skills)
        ? skills
        : skills.split(",")
      : job.skills;

    // Save updated job
    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating job",
      error: error.message,
    });
  }
};


exports.deleteJob = async (req, res, next) => { 
    try {
        const jobId = req.params.id;
        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({
            message: "Job deleted successfully"
        });
    } catch (error) {
         res.status(500).json({ 
        success: false,     
        message: "Error deleting job",
        error: error.message
        });
    }
}

// Search Jobs by title (case-insensitive partial match)
exports.searchJobs = async (req, res) => {
  try {
    const { title, location, skill } = req.query; // e.g., ?title=developer&location=Delhi&skill=React

    // If no query params provided, return 400
    if (!title && !location && !skill) {
      return res.status(400).json({
        success: false,
        message: "At least one search query (title, location, or skill) is required",
      });
    }

    // Build search filter dynamically
    let filter = {};

    if (title) {
      filter.title = { $regex: title.trim(), $options: "i" };
    }
    if (location) {
      filter.location = { $regex: location.trim(), $options: "i" };
    }
    if (skill) {
      filter.skills = { $regex: skill.trim(), $options: "i" };
    }

    // Fetch jobs
    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(200).json({
        success: true,
        total: 0,
        data: [],
        message: "No jobs found",
      });
    }

    return res.status(200).json({
      success: true,
      total: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching jobs",
      error: error.message,
    });
  }
};


