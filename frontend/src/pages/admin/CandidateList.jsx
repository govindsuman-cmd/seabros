import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaChevronLeft,
  FaChevronRight,
  FaFilePdf,
  FaIdCard,
  FaHome,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import { FiLoader, FiAlertTriangle } from "react-icons/fi";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState(-1);
  const [search, setSearch] = useState(""); // 🔍 search text
  const [isSearching, setIsSearching] = useState(false);

  const token = localStorage.getItem("auth");

  // Fetch candidates (all or paginated)
  const fetchCandidates = async () => {
    if (!token) {
      setError("No authentication token found. Please log in.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/candidates/get-all-candidate`,
        {
          headers: { Authorization: `Bearer ${token}` },
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

  // Search candidates by name
  const searchCandidates = async () => {
    if (!search.trim()) {
      // If empty search, reset to all candidates
      setIsSearching(false);
      fetchCandidates();
      return;
    }
    try {
      setLoading(true);
      setIsSearching(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/candidates/search-candidate`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { name: search },
        }
      );
      setCandidates(response.data.data || []);
      console.log("Search results:", response.data.data);
      setTotalPages(1); // search results don’t need pagination
    } catch (err) {
      console.error("Error searching candidates:", err);
      setError("Failed to search candidates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearching) {
      fetchCandidates();
    }
  }, [page, limit, order]);

  // Delete candidate handler
  const handleDelete = async (id) => {
    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this candidate?"))
      return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/candidates/delete-candidate/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setCandidates((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(response.data.message || "Failed to delete candidate");
      }
    } catch (err) {
      console.error("Error deleting candidate:", err);
      alert("Error deleting candidate");
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-700">
        <FiLoader className="text-4xl animate-spin text-blue-500" />
        <div className="mt-4 text-lg font-medium">Loading candidates...</div>
      </div>
    );
  }

  // Error UI
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
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900">
            Applied Candidates 🚀
          </h2>

          {/* 🔍 Search Bar */}
          <div className="flex w-full sm:w-1/2 items-center">
            <input
              type="text"
              placeholder="Search candidate by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <button
              onClick={searchCandidates}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
            >
              <FaSearch />
            </button>
          </div>

          {/* Order Control */}
          <div className="relative w-full sm:w-auto">
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

        {/* Candidate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    {candidate.name}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      <strong>Qualification:</strong> {candidate.qualification}
                    </p>
                    <p>
                      <strong>Nationality:</strong> {candidate.nationality}
                    </p>
                    <p>
                      <strong>Age:</strong> {candidate.age}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="font-semibold text-blue-600">
                        {candidate.status}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
                    <p className="text-gray-600 mb-2 flex items-center">
                      <FaHome className="mr-2 text-blue-500" />{" "}
                      <strong>Address:</strong> {candidate.address}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>Skills:</strong>{" "}
                      <span className="flex flex-wrap gap-2 mt-1">
                        {candidate.skills && candidate.skills.length > 0
                          ? candidate.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))
                          : "None"}
                      </span>
                    </p>
                    <p className="text-gray-600 mb-4">
                      <strong>Interview Date:</strong>{" "}
                      {new Date(candidate.interviewDate).toLocaleDateString()}{" "}
                      at{" "}
                      {new Date(candidate.interviewDate).toLocaleTimeString()}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
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
                      <div className="flex items-center gap-2">
                        <a
                          href={candidate.domicile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                        >
                          <FaHome className="mr-2" /> Domicile
                        </a>
                        <button
                          onClick={() => handleDelete(candidate._id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          title="Delete Candidate"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 text-center text-xs text-gray-500 border-t border-blue-100">
                  Applied on:{" "}
                  {new Date(candidate.applicationDate).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No candidates found
            </p>
          )}
        </div>

        {/* Pagination (hidden if searching) */}
        {!isSearching && (
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
        )}
      </div>
    </div>
  );
};

export default CandidateList;
