import React, { Component } from "react";
import LunarLander from "./LunarLander";

class GamingStation extends Component {
  state = {
    fullscreen: false,
    showGame: false
  };

  setFullscreen() {
    this.setState(prevState => ({ fullscreen: !prevState.fullscreen }));
    setTimeout(() => this.setState(prevState => ({ showGame: !prevState.showGame })), 500)
  }

  handleFrameClick() {
    if (!this.state.fullscreen) {
      this.setFullscreen(true)
    } else {
      this.setFullscreen(false)
    }
  }

  handleGameClick(e) {
    if (this.state.showGame) {
      e.stopPropagation()
    }
  }

  render() {
    let classes = "gaming-station ";
    classes += this.state.fullscreen ? "fullscreen" : "";

    return (
      <div onClick={() => this.handleFrameClick()} className={classes}>
        {this.state.showGame || true ? <LunarLander onClick={(e) => this.handleGameClick(e)} /> : null}
      </div>
    );
  }
}

export default GamingStation;
