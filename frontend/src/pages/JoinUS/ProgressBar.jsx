import React from "react";

const ProgressBar = ({ step }) => {
  const progress = (step / 4) * 100;

  return (
    <div className="w-full bg-gray-300 rounded-full h-2 mb-6">
      <div
        className="bg-blue-600 h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
