import React, { Component } from "react";

class Intro extends Component {


  render() {
    const {endIntro} = this.props
    return (
      <div className={"intro"} onClick={endIntro}>
        <p> INTRO </p>
      </div>
    );
  }
}

export default Intro;
