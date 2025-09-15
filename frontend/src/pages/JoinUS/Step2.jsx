import React from "react";

const Step2 = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <label className="block">
        Upload ID Proof
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, idProof: e.target.files[0] })
          }
          className="w-full p-2 border rounded"
        />
        {formData.idProof && <p className="text-sm text-gray-600">Selected: {formData.idProof.name}</p>}
      </label>
      <label className="block">
        Upload Resume
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, resume: e.target.files[0] })
          }
          className="w-full p-2 border rounded"
        />
        {formData.resume && <p className="text-sm text-gray-600">Selected: {formData.resume.name}</p>}
      </label>
      <label className="block">
        Domicile
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, domicile: e.target.files[0] })
          }
          className="w-full p-2 border rounded"
        />
        {formData.domicile && <p className="text-sm text-gray-600">Selected: {formData.domicile.name}</p>}
      </label>
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default Step2;
