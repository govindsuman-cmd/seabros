import React, { useState } from "react";
import { useParams } from "react-router-dom"; // 👈 import this
import axios from "axios";
import ProgressBar from "./ProgressBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const JoinUs = () => {
  const { jobId } = useParams(); // 👈 get jobId from URL
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    qualification: "",
    skills: [],
    email: "",
    idProof: null,
    resume: null,
    address: "",
    nationality: "",
    domicile: null,
    date: "",
    time: "",
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async () => {
    console.log("Applying for job ID:", jobId); // ✅ now this works
    try {
      setLoading(true);

      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item) => payload.append(`${key}[]`, item));
        } else if (formData[key] !== null) {
          payload.append(key, formData[key]);
        }
      });

      if (jobId) {
        payload.append("jobId", jobId);
        console.log("Payload jobAppliedFor:", jobId);
        console.log("Full Payload:", Array.from(payload.entries()));
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/candidates/create-candidate`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Application Submitted Successfully ✅");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `❌ Failed to submit application ${
          error.response ? error.response.data.message : error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-100 p-6 mt-10 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Join Us</h2>
      <ProgressBar step={step} />

      {step === 1 && <Step1 formData={formData} setFormData={setFormData} />}
      {step === 2 && <Step2 formData={formData} setFormData={setFormData} />}
      {step === 3 && <Step3 formData={formData} setFormData={setFormData} />}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-400 text-white rounded"
            disabled={loading}
          >
            Previous
          </button>
        )}
        {step < 3 && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default JoinUs;
