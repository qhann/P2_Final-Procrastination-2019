import React, { Component } from "react";

class Clock extends Component {


  render() {
    const { time } = this.props
    let hours = Math.floor(time / 60)
    let minutes = Math.floor(time % 60)
    minutes = minutes < 10 ? "0" + minutes : minutes
    hours = hours < 10 ? "0" + hours : hours

    return (
      <div className={"clock"}>
        <p>{hours + ":" + minutes}</p>
      </div>
    );
  }
}

export default Clock;
