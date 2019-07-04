import React, { Component } from "react";
import MentorTip from "./MentorTip";
import Player from "./Player";
import endBoy_sickest from "./Player/end-boy-sickest.svg"

class EndScreen extends Component {
  render() {
    const { nextScreen, playerName, artWork } = this.props;
    return (
      <div className={"end-screen"}>
        {/* Awards */}
        {/* Cat */}
        {/* Highscores */}
        {/* CharHealth */}
        {/* Advice */}
        {/* <Player player={player} /> */}
        <img className={"end-art"} src={artWork} />
        <img className={"endboy"} src={endBoy_sickest} alt=""/>
        <MentorTip text={"Hier deine Endwerte. Bittesehr."} />
      </div>
    );
  }
}

export default EndScreen;
