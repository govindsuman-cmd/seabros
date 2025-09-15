const express= require("express");
const router = express.Router();
const upload = require("../utils/multer");

const { createCandidate, getAllCandidate, getCandidateJobWise, getSingleCandidate, deleteCandidate, shortlistCandidate, rejectCandidate } = require("../controllers/candidateController");
const { isCustomer, isAdmin, auth } = require("../middleware/authn");
//const { auth, isAdmin } = require("../middleware/authn");

router.post(
  "/create-candidate",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "domicile", maxCount: 1 }
  ]),
  createCandidate
);
router.get('/get-single-candidate/:id', getSingleCandidate) // test route to check if auth is working
router.get("/get-all-candidate", getAllCandidate)
router.get("/get-candidate-jobwise/:jobId", getCandidateJobWise) // to get candidates for a specific job
router.delete("/delete-candidate/:id",deleteCandidate)
router.put("/shortlist-candidate/:id", shortlistCandidate)
router.put("/reject-candidate/:id", rejectCandidate)

module.exports = router;