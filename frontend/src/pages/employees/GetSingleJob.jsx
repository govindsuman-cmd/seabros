import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetSingleJob = ({ jobId, isOpen, onClose }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && jobId) {
      console.log("Fetching details for job ID 2:", jobId);
      const fetchJob = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/jobs/get-single-job/${jobId}`
          );
          setJob(res.data.job);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch job details");
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [isOpen, jobId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-blue-900 bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          {/* Header */}
          <div className="bg-blue-800 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Job Details</h2>
            <button onClick={onClose} className="text-blue-200 hover:text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-5 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : job ? (
              <div>
                {/* Title + Type */}
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-2xl font-bold text-blue-900">{job.title}</h1>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {job.jobType}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Job Description</h3>
                  <p className="text-gray-700">{job.description}</p>
                </div>

                {/* Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-700 mb-1">Location</h4>
                    <p className="text-blue-900">{job.location}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-700 mb-1">Salary Range</h4>
                    <p className="text-blue-900">{job.salaryRange}</p>
                  </div>
                </div>

                {/* Requirements */}
                {job.requirements?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Requirements</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                {job.skills?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => navigate(`/join/${jobId}`)} // 👈 Go to JoinUs page with jobId
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Job not found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSingleJob;
