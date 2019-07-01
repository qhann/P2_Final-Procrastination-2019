import React, { Component } from "react";
import owlFile from "./sounds/owl.wav"

class Clock extends Component {

  state = {
    owl: new Audio(owlFile)
  }

  render() {
    const { time } = this.props
    let days = 1 + Math.floor(time / (60*12))
    let hours = (Math.floor(time / 60) % 12 + 18) % 24
    let minutes = Math.floor(time % 60)
    minutes = minutes < 10 ? "0" + minutes : minutes
    hours = hours < 10 ? "0" + hours : hours

    let owlWasPlayed = false
    if (hours == 0 && minutes == 0 && !owlWasPlayed) {
      console.log("owl");
      
      this.state.owl.play()
    } 

    return (
      <div className={"clock"}>
        <p className={"days"}>Tag: {days}</p>
        <p className={"time"}>{hours + ":" + minutes}</p>
      </div>
    );
  }
}

export default Clock;
