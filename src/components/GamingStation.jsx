import React, { Component } from "react";
import LunarLander from "./LunarLander";

class GamingStation extends Component {
  state = {
    fullscreen: false
  };

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
  }

  render() {
    let classes = "gaming-station ";
    classes += this.state.fullscreen ? "fullscreen" : "";

    return (
      <div onClick={() => this.toggleFullscreen()} className={classes}>
        {this.state.fullscreen ? <LunarLander /> : {}}
      </div>
    );
  }
}

export default GamingStation;
