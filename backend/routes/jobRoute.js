const express = require("express");
const router = express.Router();

const { createJob, getAllJobs, editJob, deleteJob, getSingleJob } = require("../controllers/jobController");
const { auth, isAdmin } = require("../middleware/authn");

router.post("/create-job", createJob);
router.get("/get-all-jobs", getAllJobs);
router.get("/get-single-job/:id", getSingleJob);
router.put("/edit-job/:id", auth, isAdmin, editJob);
router.delete("/delete-job/:id", deleteJob); 
module.exports = router;