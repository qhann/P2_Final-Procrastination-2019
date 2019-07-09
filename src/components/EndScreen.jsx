import React, { Component } from "react";
import MentorTip from "./MentorTip";
import Player from "./Player";
import endBoy_sickest from "./Player/end-boy-sickest.svg";
import trophy1 from "./SVGs/trophy1.svg";
import trophy2 from "./SVGs/trophy2.svg";
import trophy3 from "./SVGs/trophy3.svg";
import trophy0 from "./SVGs/dirtyboot.svg";
import trophyStand from "./SVGs/trophyStand.svg";
import Cat from "./Cat";

class EndScreen extends Component {
  render() {
    const {
      nextScreen,
      playerName,
      gender,
      artWork,
      sleepTime,
      highScores
    } = this.props;

    let mentorText = "";
    let tiredness;
    let mediumSleepTime = ~~((sleepTime / 60 / 3) * 10) / 10;
    if (sleepTime < 2 * 60 * 3) {
      tiredness = "dead";
      mentorText += `Du hast durchschnittlich ${mediumSleepTime} Stunden geschlafen. 8 Stunden pro Nacht sind empfehlenswert. Durch den extremen Schlafmangel hast du Depressionen entwickelt und dein Risiko für Herzinfarkte hat sich durch Arteriosklerose extrem erhöht. Du hattest eine Herzattacke und bist gestorben.`;
    } else if (sleepTime < 4 * 60 * 3) {
      tiredness = "sickest";
      mentorText += `8 Stunden pro Nacht sind empfehlenswert. Du hast durchschnittlich ${mediumSleepTime} Stunden geschlafen. Durch den großen Schlafmangel hast du gravierende Krankheiten, wie Depressionen, Fettleibigkeit, Diabetes, ein erhöhtes Alzheimerrisiko und Herzerkrankungen entwickelt, welche deine Lebensqualität immens einschränken. Regelmäßige Krankenhausaufenthalte und Medikamente gehören nun zu deinem Alltag.`;
    } else if (sleepTime < 6 * 60 * 3) {
      tiredness = "tiredest";
      mentorText += `8 Stunden pro Nacht sind empfehlenswert. Du hast im Schnitt ${mediumSleepTime} Stunden geschlafen, dadurch wirst du ständig von Paranoia und hohem Stressempfinden, mit gelegentlichen Halluzinationen geplagt. Außerdem hat sich dein Risiko für Herzinfarkte verdoppelt. Du bewältigst deinen Alltag unter starkem Konzentrationsmangel, erhöhter Reizbarkeit und vermindertem Reaktionsvermögen.`;
    } else if (sleepTime < 8 * 60 * 3) {
      tiredness = "tired";
      mentorText += `8 Stunden pro Nacht sind empfehlenswert. Du hast im Schnitt ${mediumSleepTime} Stunden geschlafen, wodurch sich dein Konzentrations- und Reaktionsvermögen vermindert und deine Reizbarkeit erhöht hat. Du bewältigst deinen Alltag unter leichter, aber konstanter, Einschränkung deiner Lebensqualität.`;
    } else if (sleepTime > 8 * 60 + 3) {
      tiredness = "rested";
      mentorText += `8 Stunden pro Nacht sind empfehlenswert. Du hast im Schnitt ${mediumSleepTime} Stunden geschlafen, somit hast du alles richtig gemacht und bist gesund! Herzlichen Glückwunsch, du kannst dich glücklich schätzen, schwerwiegende Krankheiten, wie Herzerkrankungen, umgangen zu haben!`;
    }

    if (tiredness == "sickest" && Math.random() <= 0.3) {
      tiredness = "dead";
    }

    let awardsCount, percentWorkTime, percentExhaustion, workScore;
    percentWorkTime = this.props.workTime / 360 / 3;
    percentWorkTime = percentWorkTime > 1 ? 1 : percentWorkTime;
    percentExhaustion = this.props.workingExhaustion / 100;

    workScore = (1 - percentExhaustion) * percentWorkTime * 100;
    workScore = workScore ? ~~workScore : 0;

    console.log(percentWorkTime, percentExhaustion, workScore);
    

    if (workScore < 20) {
      awardsCount = 0;
    } else if (workScore > 20 && workScore < 50) {
      awardsCount = 1;
    } else if (workScore > 50 && workScore < 80) {
      awardsCount = 2;
    } else if (workScore > 80) {
      awardsCount = 3;
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
        {tiredness != "dead" ? (
          <Cat
            className={"catFadeIn"}
            moving={false}
            player={{ action: "none" }}
            direction={"left"}
            time={1}
            position={{ x: 1200, y: 400 }}
          />
        ) : null}

        {/* <img className={"end-player"} src={endBoy_sickest} alt=""/> */}

        <Player tiredness={tiredness} location={"end"} />

        <MentorTip text={mentorText} />

        <div className={"award-wrapper"}>
          {Object.keys(artWork).length !== 0 ? (
            <img className={"end-art"} src={artWork} />
          ) : null}
          <img src={trophyStand} className={"trophy-stand"} alt="" />
          <div className={"trophy-wrapper"}>
            {awardsCount == 0 ? (
              <img className={"trophy trophy-trash"} src={trophy0} alt="" />
            ) : null}
            {awardsCount >= 1 ? (
              <img className={"trophy trophy-min"} src={trophy1} alt="" />
            ) : null}
            {awardsCount >= 2 ? (
              <img className={"trophy trophy-med"} src={trophy2} alt="" />
            ) : null}
            {awardsCount >= 3 ? (
              <img className={"trophy trophy-max"} src={trophy3} alt="" />
            ) : null}
          </div>
        </div>
        <div className={"end-restart-button"} onClick={nextScreen}>Nochmal</div>
      </div>
    );
  }
}

EndScreen.defaultProps = {
  highScores: {
    lunar: 0,
    pong: 0,
    snake: 0
  }
}

export default EndScreen;
