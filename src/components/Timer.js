import React from "react";
import PropTypes from "prop-types";

import "./Timer.style.scss";

const padTime = (time, length = 2) => {
  return time.toString().padStart(length, "0");
  //return time < 10 ? `0${time}` : time;
};

const normalizeHours = (value) => {
  if (value < 0) {
    return "00";
  } else if (value > 23) {
    return "23";
  } else {
    return padTime(value);
  }
};

const normalizeMinutesOrSeconds = (value) => {
  if (value < 0) {
    return "00";
  } else if (value > 59) {
    return "59";
  } else {
    return padTime(value);
  }
};

const normalizeMilliseconds = (value) => {
  if (value < 0) {
    return "000";
  } else if (value > 999) {
    return "999";
  } else {
    return padTime(value, 3);
  }
};

const normalizeSeconds = (seconds) => {};

const Timer = ({
  hours,
  minutes,
  seconds,
  milliseconds,
  showHours,
  showMilliseconds,
}) => {
  return (
    <h2 className="timer">
      {showHours && normalizeHours(hours) + ":"}
      {normalizeMinutesOrSeconds(minutes)}:{normalizeMinutesOrSeconds(seconds)}
      {showMilliseconds && "." + normalizeMilliseconds(milliseconds)}
    </h2>
  );
};

Timer.defaultProps = {
  hours: 0,
  milliseconds: 0,
  showHours: false,
  showMilliseconds: false,
};

Timer.propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  milliseconds: PropTypes.number,
  showHours: PropTypes.bool,
  showMilliseconds: PropTypes.bool,
};

export default Timer;
