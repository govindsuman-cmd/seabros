import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSortAlphaDown, FaSortAlphaUp, FaChevronLeft, FaChevronRight, FaFilePdf, FaIdCard, FaHome } from "react-icons/fa";
import { FiLoader, FiAlertTriangle } from "react-icons/fi";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState(-1);

  useEffect(() => {
    const fetchCandidates = async () => {
      const token = localStorage.getItem("auth");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/candidates/get-all-candidate`,{
            headers: { Authorization: `Bearer ${token}`},
             params: { page, limit, order },
          }
        );

        setCandidates(response.data.data || []);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Failed to fetch candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [page, limit, order]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-700">
        <FiLoader className="text-4xl animate-spin text-blue-500" />
        <div className="mt-4 text-lg font-medium">Loading candidates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-red-600">
        <FiAlertTriangle className="text-4xl" />
        <div className="mt-4 text-lg font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header and Order Control */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          {/* Adjusted font size for mobile */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-4 sm:mb-0 text-center sm:text-left">
            Applied Candidates 🚀
          </h2>
          <div className="relative w-full sm:w-auto"> {/* Full width on mobile */}
            <select
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="appearance-none block w-full px-4 py-2 pr-8 text-sm font-medium text-blue-800 bg-white border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value={-1}>Latest First</option>
              <option value={1}>Oldest First</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
              {order === -1 ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
            </div>
          </div>
        </div>

        {/* Candidate Cards Grid */}
        {/* Changed grid layout to be `grid-cols-1` by default for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">{candidate.name}</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Qualification:</strong> {candidate.qualification}</p>
                  <p><strong>Nationality:</strong> {candidate.nationality}</p>
                  <p><strong>Age:</strong> {candidate.age}</p>
                  <p><strong>Status:</strong> <span className="font-semibold text-blue-600">{candidate.status}</span></p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
                  <p className="text-gray-600 mb-2 flex items-center"><FaHome className="mr-2 text-blue-500" /> <strong>Address:</strong> {candidate.address}</p>
                  <p className="text-gray-600 mb-2">
                    <strong>Skills:</strong>{" "}
                    <span className="flex flex-wrap gap-2 mt-1">
                      {candidate.skills && candidate.skills.length > 0 ? (
                        candidate.skills.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{skill}</span>
                        ))
                      ) : (
                        "None"
                      )}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-4"><strong>Interview Date:</strong> {new Date(candidate.interviewDate).toLocaleDateString()} at {new Date(candidate.interviewDate).toLocaleTimeString()}</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={candidate.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                    >
                      <FaFilePdf className="mr-2" /> Resume
                    </a>
                    <a
                      href={candidate.idProof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                    >
                      <FaIdCard className="mr-2" /> ID Proof
                    </a>
                    <a
                      href={candidate.domicile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                    >
                      <FaHome className="mr-2" /> Domicile
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 text-center text-xs text-gray-500 border-t border-blue-100">
                Applied on: {new Date(candidate.applicationDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mt-8 flex-wrap">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-full disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors duration-200"
          >
            <FaChevronLeft className="mr-1" /> Previous
          </button>
          <span className="font-semibold text-base sm:text-lg text-blue-800">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-full disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors duration-200"
          >
            Next <FaChevronRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateList;