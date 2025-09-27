const express = require("express");
const router = express.Router();

const { createJob, getAllJobs, editJob, deleteJob, getSingleJob } = require("../controllers/jobController");
const { auth, authorizeRoles } = require("../middleware/authn");

router.post("/create-job", auth, authorizeRoles('Admin', 'Employee'), createJob);
router.get("/get-all-jobs", getAllJobs);
router.get("/get-single-job/:id", getSingleJob);

// 👇 use authorizeRoles here instead of isAdmin
router.put("/edit-job/:id", auth, authorizeRoles('Admin', 'Employee'), editJob);

router.delete("/delete-job/:id",auth, authorizeRoles('Admin', 'Employee'), deleteJob);

module.exports = router;
