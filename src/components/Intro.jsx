import React, { Component } from "react";
import Mentor from "./SVGs/mentor.svg";

class Intro extends Component {
  render() {
    const { nextScreen, playerName } = this.props;
    return (
      <div className={"intro"}>
        <button className={"button-intro"} onClick={nextScreen}>
          Start
        </button>
        <p className={"intro-text"}>
          Hallo {playerName}, <br />
          stell dir vor dein großes Ziel ist es, eines Tages ein erfolgreicher
          Künstler zu werden, der sich mit dem Schaffen von Skulpturen und
          Installationen beschäftigt. Diese Leidenschaft ist in deiner Kindheit
          entstanden und hat sich als einfaches Hobby zu deinem Traum
          entwickelt. Du möchtest anderen Menschen helfen, den Weg zur Kunst zu
          finden und sie genauso begeistern wie es Kunstwerke bei dir schaffen.
          <br />
          Momentan arbeitest du tagsüber in einem Büro und fühlst dich dort
          nicht ausreichend kreativ ausgelastet. Nun möchtest du mit deiner
          ersten Skulptur beginnen, die du daraufhin veröffentlichen kannst. Du
          wirst ab jetzt drei Tage deine Freizeit zwischen 18 Uhr abends und 6
          Uhr morgens erleben und erhältst die Chance deinen Traum zu erfüllen,
          wenn du dich von anderen Faktoren nicht zu sehr ablenken lässt. Du
          solltest immer deine Gesundheit im Blick behalten und dementsprechend
          überlegte Entscheidungen treffen. Diese werden Konsequenzen für deine
          Zukunft haben.
        </p>
        <img src={Mentor} className={"intro-mentor"} />
      </div>
    );
  }
}

export default Intro;
