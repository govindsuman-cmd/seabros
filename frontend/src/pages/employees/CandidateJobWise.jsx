import React, { useEffect, useState } from "react";
import axios from "axios";

const CandidateJobWise = () => {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  // Jobs pagination + order
  const [jobPage, setJobPage] = useState(1);
  const [jobLimit] = useState(5);
  const [jobOrder, setJobOrder] = useState(-1);

  // Candidates pagination + order
  const [candidatePage, setCandidatePage] = useState(1);
  const [candidateLimit] = useState(5);
  const [candidateOrder, setCandidateOrder] = useState(-1);

  // Metadata for jobs & candidates (total count)
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);

  // Fetch jobs
  useEffect(() => {
    fetchJobs();
  }, [jobPage, jobOrder]);

  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/jobs/get-all-jobs?page=${jobPage}&limit=${jobLimit}&order=${jobOrder}`
      );
      setJobs(res.data.data || []);
      setTotalJobs(res.data.totalJobs || 0);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoadingJobs(false);
    }
  };

  // Fetch candidates for a job
  useEffect(() => {
    if (selectedJob) {
      fetchCandidates(selectedJob);
    }
  }, [candidatePage, candidateOrder, selectedJob]);

  const fetchCandidates = async (jobId) => {
    try {
      setLoadingCandidates(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/candidates/get-candidate-jobwise/${jobId}?page=${candidatePage}&limit=${candidateLimit}&order=${candidateOrder}`
      );
      setCandidates(res.data.data || []);
      setTotalCandidates(res.data.totalCandidates || 0);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    } finally {
      setLoadingCandidates(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-gray-100 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Jobs & Candidates</h2>

      {/* Jobs Section */}
      <h3 className="text-xl font-semibold mb-3">Available Jobs</h3>
      {loadingJobs ? (
        <p className="text-gray-600">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600">No jobs found.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <li
              key={job._id}
              className={`p-4 border rounded cursor-pointer ${
                selectedJob === job._id ? "bg-blue-100 border-blue-500" : "bg-white"
              } hover:shadow`}
              onClick={() => {
                setSelectedJob(job._id);
                setCandidatePage(1); // reset candidate pagination when selecting new job
              }}
            >
              <h4 className="font-bold">{job.title}</h4>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm text-gray-500">
                Deadline:{" "}
                {job.applicationDeadline
                  ? new Date(job.applicationDeadline).toLocaleDateString()
                  : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Jobs Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setJobPage((prev) => Math.max(prev - 1, 1))}
          disabled={jobPage === 1}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {jobPage} of {Math.ceil(totalJobs / jobLimit) || 1}
        </span>
        <button
          onClick={() =>
            setJobPage((prev) =>
              prev < Math.ceil(totalJobs / jobLimit) ? prev + 1 : prev
            )
          }
          disabled={jobPage >= Math.ceil(totalJobs / jobLimit)}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={() => setJobOrder(jobOrder === -1 ? 1 : -1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {jobOrder === -1 ? "Show Oldest Jobs" : "Show Latest Jobs"}
        </button>
      </div>

      {/* Candidates Section */}
      {selectedJob && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-3">
            Candidates for Job: {selectedJob}
          </h3>

          {loadingCandidates ? (
            <p className="text-gray-600">Loading candidates...</p>
          ) : candidates.length === 0 ? (
            <p className="text-gray-600">No candidates applied yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Qualification</th>
                    <th className="p-2 border">Skills</th>
                    <th className="p-2 border">Experience</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Applied On</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="p-2 border">{c.name}</td>
                      <td className="p-2 border">{c.email}</td>
                      <td className="p-2 border">{c.qualification}</td>
                      <td className="p-2 border">{c.skills?.join(", ")}</td>
                      <td className="p-2 border">
                        {c.experience} yrs ({c.experienceAs})
                      </td>
                      <td className="p-2 border">
                        <span
                          className={`px-2 py-1 rounded text-white text-sm ${
                            c.status === "Approved"
                              ? "bg-green-600"
                              : c.status === "Rejected"
                              ? "bg-red-600"
                              : "bg-yellow-500"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="p-2 border">
                        {new Date(c.applicationDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Candidates Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCandidatePage((prev) => Math.max(prev - 1, 1))}
              disabled={candidatePage === 1}
              className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {candidatePage} of {Math.ceil(totalCandidates / candidateLimit) || 1}
            </span>
            <button
              onClick={() =>
                setCandidatePage((prev) =>
                  prev < Math.ceil(totalCandidates / candidateLimit)
                    ? prev + 1
                    : prev
                )
              }
              disabled={candidatePage >= Math.ceil(totalCandidates / candidateLimit)}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="flex justify-center mt-2">
            <button
              onClick={() => setCandidateOrder(candidateOrder === -1 ? 1 : -1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              {candidateOrder === -1
                ? "Show Oldest Candidates"
                : "Show Latest Candidates"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateJobWise;
