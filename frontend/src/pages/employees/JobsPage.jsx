import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [order] = useState(-1);
  const [total, setTotal] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/jobs/get-all-jobs?page=${page}&limit=${limit}&order=${order}`
      );
      console.log("Jobs after deletion:", res.data.data);
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

const confirmDelete = (id) => {
  setJobToDelete(id);
  setShowConfirm(true);
};

const handleDelete = async () => {
  if (!jobToDelete) return; // safety check

  const token = localStorage.getItem("auth"); // your token key
  if (!token) {
    alert("You are not authenticated");
    return;
  }

  try {
    // Make DELETE request
    const res = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/jobs/delete-job/${jobToDelete}`,{
        headers: {
          Authorization: `Bearer ${token}`, // pass token here
        },
      }
    );
     console.log(res.data)
     console.log(res)
    if (res.data) {
      // Refresh jobs
      await fetchJobs();
      setShowConfirm(false);
      setJobToDelete(null);
      fetchJobs();

    } else {
      console.error("Deletion failed:", res.data.message);
      alert("Failed to delete job.");
    }
  } catch (error) {
    console.error("Error deleting job:", error);
    alert("Error deleting job.");
  }
};


  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Jobs</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading jobs...</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                <p className="text-gray-600 mt-1 line-clamp-2">{job.description || "No description."}</p>
                <div className="mt-2 text-sm text-gray-500 flex flex-wrap gap-2">
                  <span className="bg-gray-100 px-2 py-1 rounded">Vacancies: {job.jobVacancies}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Location: {job.location}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Type: {job.jobType}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Salary: {job.salaryRange || "Not specified"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 md:mt-0 items-center">
                <button
                  onClick={() => navigate(`/jobs/${job._id}/candidates`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow transition"
                >
                  View Candidates
                </button>

                <button
                  onClick={() => navigate(`/jobs/${job._id}/edit`)}
                  className="p-2 text-green-600 hover:text-green-800 bg-green-50 rounded-lg transition"
                >
                  <FiEdit size={20} />
                </button>

                <button
                  onClick={() => confirmDelete(job._id)}
                  className="p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-lg transition"
                >
                  <FiTrash size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-8 gap-3">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || loading}
          className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || loading}
          className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this job? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
