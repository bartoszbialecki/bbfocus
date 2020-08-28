import React from "react";

import "./ProgressBar.style.scss";

const ProgressBar = ({ percent = 100, position = "left" }) => {
  return (
    <div
      className={`progress-bar${
        position === "right" ? " progress-bar--right-positioned" : ""
      }`}
    >
      <div style={{ width: `${percent}%` }}></div>
    </div>
  );
};

export default ProgressBar;
