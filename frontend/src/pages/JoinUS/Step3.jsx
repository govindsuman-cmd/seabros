import React, { useMemo } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";

const Step3 = ({ formData, setFormData }) => {
  const options = useMemo(() => countryList().getData(), []);
  return (
    <div className="space-y-4">
      <label className="block">
        Choose Interview Date
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block">
        Choose Interview Time
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block">
        Experience
      <input
        type="number"
        placeholder="Experience*"
        value={formData.experience}
        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        className="border p-2 w-full rounded"
      />
      </label>
       <Select
      options={options}
      className="w-full p-2 border rounded"
      value={options.find(c => c.value === formData.nationality)}
      onChange={(val) => setFormData({ ...formData, nationality: val.value })}
    />
    </div>
  );
};

export default Step3;
