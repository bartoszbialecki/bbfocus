import React, { Component } from "react";

import "./Timer.style.scss";

const padTime = (time) => {
  //.toString().padStart(2, "0")
  return time < 10 ? `0${time}` : time;
};

const Timer = ({ minutes = 25, seconds = 0 }) => {
  return (
    <h2 className="timer">
      {padTime(minutes)}:{padTime(seconds)}
    </h2>
  );
};

export default Timer;
