import React, { Component } from "react";

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

    return <div onClick={() => this.toggleFullscreen()} className={classes} />;
  }
}

export default GamingStation;
