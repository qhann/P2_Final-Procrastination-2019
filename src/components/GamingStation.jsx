import React, { Component } from "react";
import LunarLander from "./MiniGames/LunarLander";
import Pong from "./MiniGames/Pong";
import GamingStationSvg from "./SVGs/GamingStationSvg"
import lunarPreview from "./MiniGames/LunarLander/preview.jpg"
import pongPreview from "./MiniGames/Pong/preview.JPG"
import Moonlight from "./Moonlight";
import Player from "./Player"


class GamingStation extends Component {
  state = {
    fullscreen: false,
    showGame: false,
    gameNumber: 0
  };


  handleGameClick(e) {
    e.stopPropagation();
  }

  handleGameChange(e, number) {
    console.log(this.props.fullscreen);
    if (this.props.fullscreen) {
      
      if (e) e.stopPropagation();
      this.setState({ gameNumber: number })
      // this.state.gameNumber = number;
    }
  }

  render() {
    const { onClick, hasPlayer, fullscreen, time, player } = this.props;

    let screenClasses = "screen";
    screenClasses += fullscreen ? " fullscreen" : "";

    if (!fullscreen && this.state.gameNumber != 0) this.setState({gameNumber: 0})

    return (
      <div className={"gaming-station "}>
        {hasPlayer ? (
            <Player time={time} gender={player.gender} action={player.action} tiredness={player.tiredness} />
        ) : null}        <Moonlight time={time} className={"moonlight-bed"} />
        <GamingStationSvg />
        <div className={screenClasses} onClick={onClick}>
          {this.state.gameNumber == 0 ? (
            <div>
              <img
                src={lunarPreview}
                className={"button-game-select button-lunar"}
                onClick={e => this.handleGameChange(e, 1)}
              />
              <img
                src={pongPreview}
                className={"button-game-select button-pong"}
                onClick={e => this.handleGameChange(e, 2)}
              />
            </div>
          ) : null}
          {this.state.gameNumber == 1 ? (
            <LunarLander onClick={e => this.handleGameClick(e)} />
          ) : null}
          {this.state.gameNumber == 2 ? (
            <Pong onClick={e => this.handleGameClick(e)} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default GamingStation;
