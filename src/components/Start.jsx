import React, { Component } from "react";

class Start extends Component {
  render() {
    const { nextScreen } = this.props;
    return (
      <div className={"start"}>
        <p> FINAL PROCRASTINATION </p>
        <button className={"start-button"} onClick={nextScreen}>
          neues Spiel
        </button>
      </div>
    );
  }
}

export default Start;
