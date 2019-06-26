import React, { Component } from "react";
import cat from "./cat.svg";
import DropDown from "./DropDown";
import petgirl from "./petgirl.svg";
import playgirl from "./playgirl.svg";
import builtgirl from "./builtgirl.svg";
import feedgirl from "./feedgirl.svg";

class Cat extends Component {
  state = {
    img: cat,
    menuOpen: false,
    playerAction: builtgirl
  };

  showDropDown() {
    this.setState({ menuOpen: true });
  }

  userInteraction(type) {

  }

  render() {
    const { position, menuOpen, onClick, catInteraction, hasPlayer } = this.props;
    let playerImage, playerPostion
    if (!hasPlayer && this.state.playerAction != "none") this.setState({ playerAction: "none" })

    switch (this.state.playerAction) {
      case "pet":
        playerImage = petgirl
        playerPostion = "-100% 30%"
        break;
      case "feed":
        playerImage = feedgirl
        break;
      case "play":
        playerImage = playgirl
        break;
      case "none":
        break;

    }

    let playerStyles = {
      backgroundImage: hasPlayer ? `url(${playerImage})` : "none",
      backgroundPosition: playerPostion
    }
    let dropDownOptions = [
      {
        caption: "streicheln",
        action: () => {
          catInteraction("pet");
          this.setState({ playerAction: "pet" })
        }
      },
      {
        caption: "füttern",
        action: () => {
          catInteraction("feed");
          this.setState({ playerAction: "feed" })
        }
      },
      {
        caption: "spielen",
        action: () => {
          catInteraction("play");
          this.setState({ playerAction: "play" })
        }
      }
    ];
    let styles = {
      transform: `translate(${position.x}px, ${position.y}px)`
      // top: position.y,
      // left: position.x
    };
    return (
      <div className={"cat"} style={styles}>
        <div className={"player"} style={playerStyles}>{hasPlayer ? "Player" : ""}</div>
        <DropDown
          options={dropDownOptions}
          visible={menuOpen}
        />
        <img
          src={this.state.img}
          className={"cat-image"}
          onClick={() => onClick()}
          alt={"cat"}
        />
      </div>
    );
  }
}

export default Cat;
