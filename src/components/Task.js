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
      totalTimeInSeconds: 25 * 60,
      elapsedTimeInSeconds: 0,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStartPauseButtonClick = this.handleStartPauseButtonClick.bind(
      this
    );
    this.handleStop = this.handleStop.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      task: event.target.value,
    });
  }

  handleStartPauseButtonClick(event) {
    if (!this.state.isRunning) {
      this.setState({
        isRunning: true,
      });

      this.startTimer();
    } else {
      this.setState((prevState) => {
        let isPaused = !prevState.isPaused;

        if (isPaused) {
          this.stopTimer();
        } else {
          this.startTimer();
        }

        return {
          isPaused,
        };
      });
    }
  }

  handleStop(event) {
    this.setState({
      isRunning: false,
      isPaused: false,
      elapsedTimeInSeconds: 0,
    });

    this.stopTimer();
  }

  startTimer() {
    this.intervalId = window.setInterval(() => {
      this.setState((prevState) => {
        let elapsedTimeInSeconds = prevState.elapsedTimeInSeconds + 0.1;
        let isRunning = prevState.isRunning;

        if (elapsedTimeInSeconds >= prevState.totalTimeInSeconds) {
          elapsedTimeInSeconds = 0;
          isRunning = false;
          this.stopTimer();
        }

        return {
          isRunning,
          elapsedTimeInSeconds,
        };
      });
    }, 100);
  }

  stopTimer() {
    window.clearInterval(this.intervalId);
  }

  render() {
    const {
      task,
      isRunning,
      isPaused,
      totalTimeInSeconds,
      elapsedTimeInSeconds,
    } = this.state;

    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    const minutesLeft = Math.floor(timeLeftInSeconds / 60);
    const secondsLeft = Math.floor(timeLeftInSeconds % 60);
    const progressInPercent =
      100 - (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

    return (
      <>
        <section className="task">
          <EditableText
            textTagName="h1"
            textClassName="task__name"
            inputClassName="task__name-input"
            text={task}
            placeholder="Enter task to do..."
            handleTextChange={this.handleTitleChange}
          />
          <Timer minutes={minutesLeft} seconds={secondsLeft} />
          <ProgressBar percent={progressInPercent} />
        </section>
        <section className="timer-controls">
          <button
            className={`timer-button timer-button--${
              isRunning && !isPaused ? "pause" : "play"
            }`}
            onClick={this.handleStartPauseButtonClick}
          ></button>
          <div
            className={`timer-cancel-button-container${
              !isRunning ? " hidden" : ""
            }`}
          >
            <button
              className="timer-cancel-button"
              onClick={this.handleStop}
            ></button>
          </div>
        </section>
      </>
    );
  }
}

export default Task;
