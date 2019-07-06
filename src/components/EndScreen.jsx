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
    const { nextScreen, playerName, gender, artWork, sleepTime } = this.props;
    let tiredness 
    if (sleepTime < 4 * 60 * 3) {
      tiredness = "sickest"
    } else if (sleepTime < 6 * 60 * 3) {
      tiredness = "tiredest"
    } else if (sleepTime < 8 * 60 * 3) {
      tiredness = "tired"
    } else if (sleepTime > 8 * 60 + 3) {
      tiredness = "rested"
    }

    let awardsCount, percentWorkTime, percentExhaustion, workScore
    percentWorkTime = this.props.workTime / 360 / 3
    percentWorkTime = percentWorkTime > 1 ? 1 : percentWorkTime
    percentExhaustion = this.props.workingExhaustion / 100

    workScore = (1 - percentExhaustion) * percentWorkTime * 100
    workScore = workScore ? ~~workScore : 0

    awardsCount = 3
    if (workScore > 40 ) {
      awardsCount = 1
    } else if ( workScore > 40 && workScore < 80) {
      awardsCount = 2
    } else if ( workScore > 80) {
      awardsCount = 3
    }

  
    return (
      <div className={"end-screen"}>
        {/* Awards */}
        {/* Cat */}
        {/* Highscores */}
        {/* CharHealth */}
        {/* Advice */}
        {/* <Player player={player} /> */}
        <Cat className={"catFadeIn"} moving={false} player={{action: "none"}} direction={"left"} time={1} position={{x: 1200, y:700}} />
        <img className={"end-art"} src={artWork} />
        {/* <img className={"end-player"} src={endBoy_sickest} alt=""/> */}
        <Player tiredness={tiredness} location={"end"}/>
        <MentorTip text={["Hier deine Endwerte. Bittesehr, ", playerName + ".", <br />, "mediumExhaustion: " + ~~this.props.workingExhaustion + " workTime: " + this.props.workTime + " workScore: " + workScore + " sleepTime: " + sleepTime]} />
        <div className={"trophy-wrapper"}>
          { awardsCount >= 1 ? <img className={"trophy trophy-min"} src={trophy1} alt=""/> : null}
          { awardsCount >= 2 ? <img className={"trophy trophy-med"} src={trophy2} alt=""/> : null}
          { awardsCount >= 3 ? <img className={"trophy trophy-max"} src={trophy3} alt=""/> : null}
        </div>
      </div>
    );
  }
}

export default EndScreen;
