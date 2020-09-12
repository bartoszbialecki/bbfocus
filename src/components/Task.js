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
      totalTimeInMilliseconds: 25 * 60 * 1000,
      elapsedTimeInMilliseconds: 0,
      startTime: 0,
    };

    this.intervalId = null;

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStartPauseButtonClick = this.handleStartPauseButtonClick.bind(
      this
    );
    this.handleStop = this.handleStop.bind(this);
  }

  componentWillUnmount() {
    this.stopTimer();
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
        startTime: Date.now(),
      });

      this.startTimer();
    } else {
      this.setState((prevState) => {
        let isPaused = !prevState.isPaused;
        let startTime = prevState.startTime;

        if (isPaused) {
          this.stopTimer();
        } else {
          startTime = Date.now() - prevState.elapsedTimeInMilliseconds;
          this.startTimer();
        }

        return {
          isPaused,
          startTime,
        };
      });
    }
  }

  handleStop(event) {
    this.setState({
      isRunning: false,
      isPaused: false,
      elapsedTimeInMilliseconds: 0,
    });

    this.stopTimer();
  }

  startTimer() {
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = window.setInterval(() => {
      this.setState((prevState) => {
        let elapsedTimeInMilliseconds = Date.now() - prevState.startTime;
        let isRunning = prevState.isRunning;

        if (elapsedTimeInMilliseconds >= prevState.totalTimeInMilliseconds) {
          elapsedTimeInMilliseconds = 0;
          isRunning = false;
          this.stopTimer();
        }

        return {
          isRunning,
          elapsedTimeInMilliseconds,
        };
      });
    }, 10);
  }

  stopTimer() {
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }

  render() {
    const {
      task,
      isRunning,
      isPaused,
      totalTimeInMilliseconds,
      elapsedTimeInMilliseconds,
    } = this.state;

    const timeLeftInMilliseconds =
      totalTimeInMilliseconds - elapsedTimeInMilliseconds;
    const minutesLeft = Math.floor(timeLeftInMilliseconds / 1000 / 60);
    const secondsLeft = Math.floor((timeLeftInMilliseconds / 1000) % 60);
    const progressInPercent =
      (elapsedTimeInMilliseconds / totalTimeInMilliseconds) * 100.0;

    return (
      <>
        <React.StrictMode>
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
        </React.StrictMode>
      </>
    );
  }
}

export default Task;
