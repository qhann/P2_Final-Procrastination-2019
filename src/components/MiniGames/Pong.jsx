import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import pong from "./Pong/pongsim.js";

class Pong extends Component {
  render() {
    const { onClick, getScore } = this.props;
    return (
      <div className={"pong"} onClick={onClick}>
        <P5Wrapper sketch={pong} getScore={getScore}/>
      </div>
    );
  }
}

export default Pong;
