import React, { Component } from "react";

import Task from "./Task";

import "./App.style.scss";

class App extends Component {
  render() {
    return (
      <main className="app">
        <Task />
      </main>
    );
  }
}

export default App;
