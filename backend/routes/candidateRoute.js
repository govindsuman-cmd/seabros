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
} = require("../controllers/candidateController");

const { auth, isCustomer, isAdmin } = require("../middleware/authn");

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
router.get("/get-single-candidate/:id", auth, getSingleCandidate);
router.get("/get-all-candidate", auth, getAllCandidate);
router.get("/get-candidate-jobwise/:jobId", auth, getCandidateJobWise);
router.delete("/delete-candidate/:id", auth, deleteCandidate);
router.put("/shortlist-candidate/:id", auth, shortlistCandidate);
router.put("/reject-candidate/:id", auth, rejectCandidate);

module.exports = router;
