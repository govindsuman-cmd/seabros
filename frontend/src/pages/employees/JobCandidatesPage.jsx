import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const JobCandidatesPage = () => {
  const { jobId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [order] = useState(-1);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/candidates/get-candidate-jobwise/${jobId}?page=${page}&limit=${limit}&order=${order}`
      );
      setCandidates(res.data.data);
      console.log("Fetched Candidates:", res.data.data);
      setTotal(res.data.totalCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [page, jobId]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Candidates</h2>
      {loading ? (
        <p>Loading candidates...</p>
      ) : (
        <ul className="space-y-4">
          {candidates.map((c) => (
            <li
              key={c._id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="text-sm text-gray-600">Email: {c.email}</p>
                <p className="text-sm text-gray-600">
                  Qualification: {c.qualification}
                </p>
              </div>
              <button
                onClick={() => navigate(`/candidate/${c._id}`)}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                View Details
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

export default JobCandidatesPage;
