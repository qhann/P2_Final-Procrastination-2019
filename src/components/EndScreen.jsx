import React, { Component } from "react";
import MentorTip from "./MentorTip";
import Player from "./Player";
import endBoy_sickest from "./Player/end-boy-sickest.svg"
import trophy1 from "./SVGs/trophy1.svg"
import trophy2 from "./SVGs/trophy2.svg"
import trophy3 from "./SVGs/trophy3.svg"
import trophyStand from "./SVGs/trophyStand.svg"
import Cat from "./Cat";


class EndScreen extends Component {
  state = {
    awards: 3
  }

  render() {
    const { nextScreen, playerName, gender, artWork, sleepTime, highScores } = this.props;
    let tiredness
    if (sleepTime < 2 * 60 * 3) {
      tiredness = "dead"
    } else if (sleepTime < 4 * 60 * 3) {
      tiredness = "sickest"
    } else if (sleepTime < 6 * 60 * 3) {
      tiredness = "tiredest"
    } else if (sleepTime < 8 * 60 * 3) {
      tiredness = "tired"
    } else if (sleepTime > 8 * 60 + 3) {
      tiredness = "rested"
    }

    if (tiredness == "sickest" && Math.random() <= 0.3) {
      tiredness = "dead"
    }

    let awardsCount, percentWorkTime, percentExhaustion, workScore
    percentWorkTime = this.props.workTime / 360 / 3
    percentWorkTime = percentWorkTime > 1 ? 1 : percentWorkTime
    percentExhaustion = this.props.workingExhaustion / 100

    workScore = (1 - percentExhaustion) * percentWorkTime * 100
    workScore = workScore ? ~~workScore : 0

    awardsCount = 0
    if (workScore > 40) {
      awardsCount = 1
    } else if (workScore > 40 && workScore < 80) {
      awardsCount = 2
    } else if (workScore > 80) {
      awardsCount = 3
    }

    return (
      <div className={"end-screen"}>
        {/* Highscores */}
        <div className={"end-highscores"}>
          <p className={"highscores-title"}>Highscores:</p>
          <table className={"highscores-table"}>
            <tr>
              <td>
                <p className={"highscore-gametitle"}>Lunar-Lander: </p>
              </td>
              <td>
                <p className={"highscore-gamescore"}>{highScores.lunar}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className={"highscore-gametitle"}>Pong: </p>
              </td>
              <td>
                <p className={"highscore-gamescore"}>{highScores.pong}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className={"highscore-gametitle"}>Snake: </p>
              </td>
              <td>
                <p className={"highscore-gamescore"}>{highScores.snake}</p>
              </td>
            </tr>
          </table>
        </div>
        {tiredness != "dead" ?
          <Cat
            className={"catFadeIn"}
            moving={false}
            player={{ action: "none" }}
            direction={"left"}
            time={1}
            position={{ x: 1200, y: 700 }}
          />
          : null}
        {Object.keys(artWork).length !== 0 ?
          <img className={"end-art"} src={artWork} />
          : null}

        {/* <img className={"end-player"} src={endBoy_sickest} alt=""/> */}

        <Player tiredness={tiredness} location={"end"} />

        <MentorTip text={["Hier deine Endwerte. Bittesehr, ", playerName + ".", <br />, "mediumExhaustion: " + ~~this.props.workingExhaustion + " workTime: " + this.props.workTime + " workScore: " + workScore + " sleepTime: " + sleepTime]} />

        <div className={"award-wrapper"}>
          <img src={trophyStand} className={"trophy-stand"} alt="" />
          <div className={"trophy-wrapper"}>
            {awardsCount >= 1 ? <img className={"trophy trophy-min"} src={trophy1} alt="" /> : null}
            {awardsCount >= 2 ? <img className={"trophy trophy-med"} src={trophy2} alt="" /> : null}
            {awardsCount >= 3 ? <img className={"trophy trophy-max"} src={trophy3} alt="" /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default EndScreen;
