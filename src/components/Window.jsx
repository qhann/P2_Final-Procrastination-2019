import React, { Component } from "react";
import Moonlight from "./Moonlight";

class Window extends Component {


  render() {
    const { time } = this.props
    let percentDay = ((time / 60) % 12) / 12 * 0.5

    let skyStyles = {
      opacity: percentDay
    }

    return (
      <div className={"window"}>
        <div className={"sky"} style={skyStyles}>

        </div>
        <div className={"wall"}></div>
        <div className={"moonlight-window"} >
          <Moonlight time={time} />
        </div>
      </div>
    );
  }
}

export default Window;
