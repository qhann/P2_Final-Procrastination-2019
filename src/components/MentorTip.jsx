import React, { Component } from "react";
import mentorImage from "./SVGs/mentor.svg";

class MentorTip extends Component {


  
  getMentorText(time) {
    let text
    let day = 12 * 60
    let hour = 60
    if (time > 0 * hour + 0 * day) {
      text = "Dies ist dein Zimmer. Hier wirst du die nächsten drei Tage verbringen. Schaue dich ein wenig um, es gibt einiges zu entdecken."
    }
    if (time > 1 * hour + 0 * day) {
      text = "Teile deine Zeit gut ein. Alles was du tust, wird Auswirkungen auf dein späteres Leben haben."
    }
    if (time > 5 * hour + 0 * day) {
      text = "Kaffee senkt kurzfristig deine Erschöpfung, ist aber kein Ersatz für ausreichend Schlaf!"
    }
    if (time > 0 * hour + 1 * day) {
      text = "Achte darauf, dass du ausgeschlafen bist, wenn du arbeitest. Erschöpfung beeinträchtigt die Qualität deiner Arbeit!"
    }
    if (time > 2 * hour + 1 * day) {
      text = "Jede Interaktion mit deiner Katze stärkt eure Bindung. Eine gute Bindung zu deinem Haustier hat einen positiven Effekt auf deine Gesundheit."
    }
    if (time > 4 * hour + 1 * day) {
      text = "Ein Nickerchen während eines langen Tages kann sehr gesund und erholsam sein."
    }
    if (time > 0 * hour + 2 * day) {
      text = "Wusstest du: Dein Schlaf ist zwischen 0 und 6 Uhr am erholsamsten."
    }
    if (time > 2 * hour + 2 * day) {
      text = "Schlafentzug führt zu gedrückter Stimmung und erhöhter Reizbarkeit, langfristig auch zu Depressionen."
    }
    if (time > 5 * hour + 2 * day) {
      text = "Starker Schlafentzug kann Halluzinationen und Sinnestäuschungen hervorrufen."
    }

    if ( time % day > 8 * hour) {
      text = "Es ist schon sehr spät - denke daran, dass du morgen früh aufstehen musst!"
    }

    return text
  }

  render() {
    const { time, text } = this.props

    let displayText
    if (text == "") {
      displayText = this.getMentorText(time)
    } else {
      displayText = text
    }

    return (
      <div className={"mentor-tip"}>
        <img src={mentorImage} alt={"mentor"} />
        <p className={"mentor-text"} >
          {displayText}
        </p>
      </div>
    );
  }
}

export default MentorTip;
