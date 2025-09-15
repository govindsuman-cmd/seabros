import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateJob = () => {
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: [],
    location: "",
    salaryRange: "",
    jobType: "",
    applicationDeadline: "",
    skills: [],
  });

  const [requirementInput, setRequirementInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const addRequirement = () => {
    if (requirementInput.trim() !== "") {
      setJobData({
        ...jobData,
        requirements: [...jobData.requirements, requirementInput.trim()],
      });
      setRequirementInput("");
    }
  };

  const removeRequirement = (index) => {
    setJobData({
      ...jobData,
      requirements: jobData.requirements.filter((_, i) => i !== index),
    });
  };

  const addSkill = () => {
    if (skillInput.trim() !== "") {
      setJobData({
        ...jobData,
        skills: [...jobData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setJobData({
      ...jobData,
      skills: jobData.skills.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/jobs/create-job`, jobData);
      alert("Job created successfully!");
      navigate("/");
    } catch (err) {
      alert("Error creating job: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="description"
          value={jobData.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Requirements */}
        <div>
          <label className="block font-semibold mb-1">Requirements</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={requirementInput}
              onChange={(e) => setRequirementInput(e.target.value)}
              placeholder="Add requirement"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={addRequirement}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {jobData.requirements.map((req, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {req}
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Location */}
        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Salary Range */}
        <input
          type="text"
          name="salaryRange"
          value={jobData.salaryRange}
          onChange={handleChange}
          placeholder="Salary Range"
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Job Type 'Full-time', 'Part-time', 'Contract', 'Internship'*/}
        <select
          name="jobType"
          value={jobData.jobType}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-Time</option>
          <option value="Part-time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        {/* Application Deadline */}
        <input
          type="date"
          name="applicationDeadline"
          value={jobData.applicationDeadline}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Skills */}
        <div>
          <label className="block font-semibold mb-1">Skills</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add skill"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {jobData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
