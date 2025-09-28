const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  createCandidatePaymentOrder,
  verifyPaymentAndCreateCandidate,
  getAllCandidate,
  getCandidateJobWise,
  getSingleCandidate,
  deleteCandidate,
  shortlistCandidate,
  rejectCandidate,
  searchCandidates,
} = require("../controllers/candidateController");

const { auth, isCustomer, isAdmin, authorizeRoles } = require("../middleware/authn");

// 1️⃣ Step 1: Generate Razorpay order for candidate payment
router.post("/create-candidate-order", createCandidatePaymentOrder);

// 2️⃣ Step 2: Verify payment & create candidate
router.post(
  "/verify-payment-and-create-candidate",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "domicile", maxCount: 1 },
  ]),
  verifyPaymentAndCreateCandidate
);

// Other candidate routes
router.get("/get-single-candidate/:id", auth,
  authorizeRoles('Admin', 'Employee'), getSingleCandidate);

router.get("/get-all-candidate", auth, 
  authorizeRoles('Admin', 'Employee'), getAllCandidate);

router.get("/get-candidate-jobwise/:jobId", auth, 
  authorizeRoles('Admin', 'Employee'), getCandidateJobWise);

router.delete("/delete-candidate/:id", auth,
  authorizeRoles('Admin', 'Employee'), deleteCandidate);

router.put("/shortlist-candidate/:id", auth,
  authorizeRoles('Admin', 'Employee'), shortlistCandidate);
  
router.put("/reject-candidate/:id", auth,
  authorizeRoles('Admin', 'Employee'), rejectCandidate);

router.get("/search-candidate", auth,
  authorizeRoles('Admin', 'Employee'), searchCandidates);

module.exports = router;
