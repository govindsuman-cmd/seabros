import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const JobEditPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [requirementInput, setRequirementInput] = useState("");
  const [requirements, setRequirements] = useState([]);

  const editableFields = [
    { name: "title", label: "Job Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "location", label: "Location", type: "text" },
    { name: "jobVacancies", label: "Job Vacancies", type: "number" },
    { name: "salaryRange", label: "Salary Range", type: "text" },
    { name: "jobType", label: "Job Type", type: "text" },
    { name: "applicationDeadline", label: "Application Deadline", type: "date" },
  ];

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/jobs/get-single-job/${jobId}`
        );
        setJob(res.data.job);
        setSkills(res.data.job.skills || []);
        setRequirements(res.data.job.requirements || []);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };
  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  const addRequirement = () => {
    if (requirementInput.trim() && !requirements.includes(requirementInput.trim())) {
      setRequirements([...requirements, requirementInput.trim()]);
      setRequirementInput("");
    }
  };
  const removeRequirement = (req) => setRequirements(requirements.filter((r) => r !== req));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...job,
        skills,
        requirements,
      };

      const token = localStorage.getItem("auth"); // your token key
    if (!token) {
      alert("You are not authenticated");
      return;
    }

      await axios.put(`${import.meta.env.VITE_BASE_URL}/jobs/edit-job/${jobId}`, payload,
        {
        headers: {
          Authorization: `Bearer ${token}`, // pass token here
        },
      }
      );
      alert("Job updated successfully!");
      navigate("/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Error updating job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading job...</p>;
  if (!job) return <p className="text-center mt-10 text-red-500">Job not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input fields */}
        {editableFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="font-medium text-gray-700 mb-2">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={job[field.name] || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                rows={4}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={
                  field.type === "date" && job[field.name]
                    ? new Date(job[field.name]).toISOString().split("T")[0]
                    : job[field.name] || ""
                }
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            )}
          </div>
        ))}

        {/* Requirements */}
        <div>
          <label className="font-medium text-gray-700 mb-2 block">Requirements</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {requirements.map((req) => (
              <span
                key={req}
                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm"
              >
                {req}
                <button
                  type="button"
                  onClick={() => removeRequirement(req)}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a requirement"
              value={requirementInput}
              onChange={(e) => setRequirementInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
            />
            <button
              type="button"
              onClick={addRequirement}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow"
            >
              Add
            </button>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="font-medium text-gray-700 mb-2 block">Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
            >
              Add
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-lg disabled:opacity-50 transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default JobEditPage;
