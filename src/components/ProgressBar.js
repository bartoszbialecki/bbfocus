import React from "react";

import "./ProgressBar.style.scss";

const ProgressBar = ({ percent = 100 }) => {
  return (
    <div className="progress-bar">
      <div style={{ width: `${percent}%` }}></div>
    </div>
  );
};

export default ProgressBar;
