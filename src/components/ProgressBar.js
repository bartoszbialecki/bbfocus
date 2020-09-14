import React from "react";
import PropTypes from "prop-types";

import "./ProgressBar.style.scss";

const ProgressBar = ({ percent, decreasing, position }) => {
  return (
    <div
      className={`progress-bar${
        position === "right" ? " progress-bar--right-positioned" : ""
      }`}
    >
      <div style={{ width: `${decreasing ? 100 - percent : percent}%` }}></div>
    </div>
  );
};

ProgressBar.defaultProps = {
  percent: 100,
  decreasing: true,
  position: "left",
};

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
  decreasing: PropTypes.bool,
  position: PropTypes.oneOf(["left", "right"]),
};

export default ProgressBar;
