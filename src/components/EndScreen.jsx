import React, { Component } from "react";
import MentorTip from "./MentorTip";

class EndScreen extends Component {
  render() {
    const { nextScreen, playerName } = this.props;
    return (
      <div className={"end-screen"}>
        {/* Awards */}
        {/* Cat */}
        {/* Highscores */}
        {/* CharHealth */}
        {/* Advice */}
        <MentorTip text="Hier deine Endwerte. Bittesehr." />
      </div>
    );
  }
}

export default EndScreen;
