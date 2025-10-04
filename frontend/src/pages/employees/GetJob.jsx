import React, { useEffect, useState } from "react";
import axios from "axios";
import GetSingleJob from "./GetSingleJob"; // Make sure to create this component

const GetJob = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Jobs per page
  const [order, setOrder] = useState(-1); // -1 => latest first
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isJobPopupOpen, setIsJobPopupOpen] = useState(false);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/jobs/get-all-jobs?page=${page}&limit=${limit}&order=${order}`
      );
      setJobs(res.data.data);

      // Calculate total pages if API returns totalCount
      if (res.data.totalCount) {
        setTotalPages(Math.ceil(res.data.totalCount / limit));
      } else if (res.data.totalPages) {
        setTotalPages(res.data.totalPages);
      }

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch jobs");
      setLoading(false);
    }
  };

  fetchJobs();
}, [page, limit, order]);


  // Function to open job details
  const openJobDetails = (jobId) => {
    console.log("Opening job details for ID:", jobId);
    setSelectedJobId(jobId);
    setIsJobPopupOpen(true);
  };

  // Function to close job details
  const closeJobDetails = () => {
    setIsJobPopupOpen(false);
    setSelectedJobId(null);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-8">
        <div className="flex justify-between items-center mb-8">
          <div className="h-10 w-64 bg-blue-100 rounded-lg animate-pulse"></div>
          <div className="h-10 w-48 bg-blue-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="p-6 border border-blue-100 rounded-xl bg-white shadow-sm">
              <div className="h-6 w-3/4 bg-blue-100 rounded mb-4 animate-pulse"></div>
              <div className="h-4 w-full bg-blue-100 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-2/3 bg-blue-100 rounded mb-4 animate-pulse"></div>
              <div className="flex space-x-2 mb-4">
                <div className="h-6 w-20 bg-blue-100 rounded-full animate-pulse"></div>
                <div className="h-6 w-24 bg-blue-100 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-blue-100 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-4 md:mb-0">Available Job Positions</h2>
        <div className="flex items-center space-x-4">
          <span className="text-blue-700 font-medium">Sort by:</span>
          <select
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value))}
            className="border border-blue-300 rounded-lg p-2.5 bg-white text-blue-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          >
            <option value={-1}>Latest First</option>
            <option value={1}>Oldest First</option>
          </select>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-blue-50 rounded-xl border border-blue-100">
          <svg className="mx-auto h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-blue-800">No jobs available</h3>
          <p className="mt-2 text-blue-600">Check back later for new opportunities</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <div
  key={job._id}
  className="p-6 border border-blue-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300 cursor-pointer flex flex-col justify-between"
  onClick={() => openJobDetails(job._id)}
>
  <div>
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold text-blue-900">{job.title}</h3>
      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
        {job.jobType}
      </span>
    </div>

    <p className="text-gray-600 mt-2 line-clamp-1">{job.description}</p>

    <div className="grid grid-cols-2 gap-4 mt-5">
      <div className="flex items-center">
        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-sm text-blue-700">{job.location || "Remote"}</span>
      </div>

      <div className="flex items-center">
        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm text-blue-700">{job.salaryRange || "Negotiable"}</span>
      </div>
    </div>

    {job.applicationDeadline && (
      <div className="flex items-center mt-4">
        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-sm text-blue-700">
          Apply by: {new Date(job.applicationDeadline).toLocaleDateString()}
        </span>
      </div>
    )}

    {/* Skills */}
    <div className="mt-5 pt-4 border-t border-blue-100 min-h-[60px]">
      {job.skills && job.skills.length > 0 ? (
        <>
          <h4 className="text-sm font-medium text-blue-800 mb-2">Required Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </>
      ) : (
        <div className="text-sm text-blue-400">No skills listed</div>
      )}
    </div>
  </div>

  <button
    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-300"
    onClick={(e) => {
      e.stopPropagation();
      openJobDetails(job._id);
    }}
  >
    View Details
  </button>
</div>

          ))}
        </div>
      )}

      {/* Pagination */}
      {jobs.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t border-blue-200">
          <div className="text-blue-700 text-sm mb-4 sm:mb-0">
            Showing {jobs.length} of {totalPages * limit} jobs
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg flex items-center ${
                page === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <div className="flex space-x-1">
  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .slice(Math.max(0, page - 3), page + 2) // show 5 pages max around current
    .map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => setPage(pageNumber)}
        className={`w-10 h-10 rounded-lg ${
          page === pageNumber
            ? "bg-blue-600 text-white"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
        }`}
      >
        {pageNumber}
      </button>
    ))}
  {totalPages > 5 && page < totalPages - 2 && <span className="px-2 py-2">...</span>}
</div>

            
            <button
  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
  disabled={page >= totalPages}
  className={`px-4 py-2 rounded-lg flex items-center ${
    page >= totalPages
      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
  }`}
>
  Next
  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</button>

          </div>
        </div>
      )}

      {/* Job Details Popup */}
      <GetSingleJob 
        jobId={selectedJobId} 
        isOpen={isJobPopupOpen} 
        onClose={closeJobDetails} 
      />
    </div>
  );
};

export default GetJob;