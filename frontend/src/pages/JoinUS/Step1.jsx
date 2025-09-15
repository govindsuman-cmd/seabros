import React, { useMemo, useState } from "react";

const Step1 = ({ formData, setFormData }) => {
  const [skillInput, setSkillInput] = useState("");
  
  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({ ...formData, skills: updatedSkills });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Step 1: Basic Details</h2>
      
      <input
        type="text"
        placeholder="Name*"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border p-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Age*"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        placeholder="Qualification*"
        value={formData.qualification}
        onChange={(e) =>
          setFormData({ ...formData, qualification: e.target.value })
        }
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        placeholder="Email Address*"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        className="border p-2 w-full rounded"
      />
      {/* Skills Input */}
      <div>
        <label className="font-medium block mb-1">Skills</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter a skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
            className="border p-2 flex-1 rounded"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Show skills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {formData.skills &&
            formData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Step1;
