import React, { Component } from "react";

import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

import "./Task.style.scss";

class Task extends Component {
  render() {
    return (
      <>
        <section className="task">
          <h1 className="task__name">Task to do</h1>
          <Timer />
          <ProgressBar />
        </section>
        <sectioin className="timer-controls">
          <button className="timer-button timer-button--play"></button>
          <div className="timer-cancel-button-container hidden">
            <button className="timer-cancel-button"></button>
          </div>
        </sectioin>
      </>
    );
  }
}

export default Task;
