import React, { Component } from "react";
import MentorTip from "./MentorTip";
import Player from "./Player";
import endBoy_sickest from "./Player/end-boy-sickest.svg"
import trophy1 from "./SVGs/trophy1.svg"
import trophy2 from "./SVGs/trophy2.svg"
import trophy3 from "./SVGs/trophy3.svg"
import Cat from "./Cat";


class EndScreen extends Component {
  state = {
    awards: 3
  }
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
        <Cat moving={false} player={{action: "none"}} direction={"left"} time={1} position={{x: 1200, y:700}} />
        <img className={"end-art"} src={artWork} />
        <img className={"end-player"} src={endBoy_sickest} alt=""/>
        <MentorTip text={["Hier deine Endwerte. Bittesehr.   Hier deine Endwerte. Bittesehr.   Hier deine Endwerte. Bittesehr.   Hier deine Endwerte. Bittesehr.   Hier deine Endwerte. Bittesehr.", <br />, "mediumExhaustion: " + ~~this.props.workingExhaustion + " workTime:" + this.props.workTime]} />
        <div>
          { this.state.awards >= 1 ? <img className={"trophy"} src={trophy1} alt=""/> : null}
          { this.state.awards >= 2 ? <img className={"trophy"} src={trophy2} alt=""/> : null}
          { this.state.awards >= 3 ? <img className={"trophy"} src={trophy3} alt=""/> : null}
        </div>
      </div>
    );
  }
}

export default EndScreen;
