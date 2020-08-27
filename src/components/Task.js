import React, { Component } from "react";

import EditableText from "./EditableText";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

import "./Task.style.scss";

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      isPaused: false,
      task: null,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      task: event.target.value,
    });
  }

  render() {
    return (
      <>
        <section className="task">
          <EditableText
            textTagName="h1"
            textClassName="task__name"
            inputClassName="task__name-input"
            text={this.state.task}
            placeholder="Enter task to do..."
            handleTextChange={this.handleTitleChange}
          />
          <Timer />
          <ProgressBar />
        </section>
        <section className="timer-controls">
          <button className="timer-button timer-button--play"></button>
          <div className="timer-cancel-button-container hidden">
            <button className="timer-cancel-button"></button>
          </div>
        </section>
      </>
    );
  }
}

export default Task;
