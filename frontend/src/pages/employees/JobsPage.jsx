import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [order] = useState(-1);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/jobs/get-all-jobs?page=${page}&limit=${limit}&order=${order}`
      );
      setJobs(res.data.data);
      setTotal(res.data.totalJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Jobs</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  {job.description?.substring(0, 60)}...
                </p>
              </div>
              <button
                onClick={() => navigate(`/jobs/${job._id}/candidates`)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                View Candidates
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || loading}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || loading}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobsPage;
