import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CandidateDetailsPage = () => {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchCandidate = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/candidates/get-single-candidate/${candidateId}`,{
          headers: { Authorization: `Bearer ${localStorage.getItem("auth")}` }
        }
      );
      setCandidate(res.data.candidate);
    } catch (error) {
      console.error("Error fetching candidate:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, [candidateId]);

  // Handle Approve / Reject
  const handleAction = async (action) => {
    if (!candidateId) return;
    setActionLoading(true);
    setMessage("");
    try {
      const endpoint =
        action === "approve"
          ? `${import.meta.env.VITE_BASE_URL}/candidates/shortlist-candidate/${candidateId}`
          : `${import.meta.env.VITE_BASE_URL}/candidates/reject-candidate/${candidateId}`;

      await axios.put(endpoint, null, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("auth")}`,
  },
});

      setMessage(
        action === "approve"
          ? "✅ Candidate approved successfully!"
          : "❌ Candidate rejected successfully!"
      );

      // Update status locally
      setCandidate((prev) => ({
        ...prev,
        status: action === "approve" ? "Approved" : "Rejected",
      }));
    } catch (error) {
      console.error("Error updating candidate:", error);
      setMessage("⚠️ Something went wrong. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading candidate details...
        </p>
      </div>
    );

  if (!candidate)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg font-medium text-red-500">No candidate found</p>
      </div>
    );

  // Avatar initials
  const initials = candidate.name
    ? candidate.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "NA";

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-md">
          {initials}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{candidate.name}</h2>
          <p className="text-gray-500">{candidate.email}</p>
        </div>
      </div>

      {/* Candidate Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <Info label="Age" value={candidate.age} />
        <Info label="Qualification" value={candidate.qualification} />
        <Info label="Nationality" value={candidate.nationality} />
        <Info
          label="Experience"
          value={`${candidate.experience} years as ${candidate.experienceAs}`}
        />
        <Info
          label="Skills"
          value={
            candidate.skills?.length
              ? candidate.skills.join(", ")
              : "Not Provided"
          }
        />
        <Info label="Address" value={candidate.address} />
        <Info label="Status" value={candidate.status} />
        <Info
          label="Interview Date"
          value={
            candidate.interviewDate
              ? new Date(candidate.interviewDate).toLocaleDateString()
              : "Not Scheduled"
          }
        />
        <Info
          label="Application Date"
          value={
            candidate.applicationDate
              ? new Date(candidate.applicationDate).toLocaleDateString()
              : "N/A"
          }
        />
      </div>

      {/* Documents */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Documents</h3>
        <div className="flex flex-wrap gap-4">
          {candidate.resume && (
            <DocButton
              href={candidate.resume}
              label="Download Resume"
              color="blue"
              icon="📄"
            />
          )}
          {candidate.domicile && (
            <DocButton
              href={candidate.domicile}
              label="Download Domicile"
              color="green"
              icon="🏠"
            />
          )}
          {candidate.idProof && (
            <DocButton
              href={candidate.idProof}
              label="Download ID Proof"
              color="purple"
              icon="🪪"
            />
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex gap-4">
        <button
          onClick={() => handleAction("approve")}
          disabled={actionLoading}
          className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
        >
          ✅ Approve
        </button>
        <button
          onClick={() => handleAction("reject")}
          disabled={actionLoading}
          className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition disabled:opacity-50"
        >
          ❌ Reject
        </button>
      </div>

      {/* Message */}
      {message && (
        <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
};

// Info Component (for grid)
const Info = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500 font-medium">{label}</span>
    <span className="text-base font-semibold text-gray-800">{value}</span>
  </div>
);

// Document Button
const DocButton = ({ href, label, color, icon }) => {
  const colorMap = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-5 py-2.5 text-white rounded-lg shadow-md transition ${colorMap[color]}`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </a>
  );
};

export default CandidateDetailsPage;
