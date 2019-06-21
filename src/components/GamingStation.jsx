import React, { Component } from "react";
import LunarLander from "./LunarLander";
import Pong from "./Pong";
import gameImage from "./game.svg"

class GamingStation extends Component {
  state = {
    fullscreen: false,
    showGame: false,
    gameNumber: 0
  };

  setFullscreen() {
    this.setState(prevState => ({ fullscreen: !prevState.fullscreen }));
    setTimeout(
      () => this.setState(prevState => ({ showGame: !prevState.showGame })),
      500
    );
  }

  handleFrameClick() {
    if (!this.state.fullscreen) {
      this.setFullscreen(true);
    } else {
      this.setFullscreen(false);
    }
  }

  handleGameClick(e) {
    if (this.state.showGame) {
      e.stopPropagation();
    }
  }

  handleGameChange(e, number) {
    e.stopPropagation();
    this.state.gameNumber = number;
  }

  render() {
    let classes = "gaming-station ";
    classes += this.state.fullscreen ? "fullscreen" : "";

    return (
      <div onClick={() => this.handleFrameClick()} className={classes}>
        <div className={"screen"}>
          <button
            className={"buttonLunarLander"}
            onClick={e => this.handleGameChange(e, 1)}
          />
          <button
            className={"buttonPong"}
            onClick={e => this.handleGameChange(e, 2)}
          />
          {this.state.gameNumber == 1 ? (
            <LunarLander onClick={e => this.handleGameClick(e)} />
          ) : null}
          {this.state.gameNumber == 2 ? (
            <Pong onClick={e => this.handleGameClick(e)} />
          ) : null}
        </div>
        <svg id={"game-svg"} width="100%" height="100%">
          <use xlinkHref={gameImage + "#game"} />
        </svg>
      </div>
    );
  }
}

export default GamingStation;
