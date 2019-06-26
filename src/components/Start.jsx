import React, { Component } from "react";

class Start extends Component {
  render() {
    const { start } = this.props;
    return (
      <div className={"start"}>
        <p> FINAL PROCRASTINATION </p>
        <button className={"start-button"} onClick={start}>
          neues Spiel
        </button>
      </div>
    );
  }
}

export default Start;
