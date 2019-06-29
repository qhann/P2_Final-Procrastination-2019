import React, { Component } from "react";
import cat from "./SVGs/cat.svg";
import DropDown from "./DropDown";
import petgirl from "./Player/petgirl.svg";
import playgirl from "./Player/playgirl.svg";
import builtgirl from "./Player/builtgirl.svg";
import feedgirl from "./Player/feedgirl.svg";
import girl from "./Player/girl.svg";

class Cat extends Component {
  state = {
    img: cat,
    menuOpen: false,
    playerAction: "",
    catTransform: {}
  };

  showDropDown() {
    this.setState({ menuOpen: true });
  }

  userInteraction(type) {}

  hallucinate() {
    this.setState({
      catTransform: {
        transform: "scale(150)",
        opacity: "0",
        transition: "transform 0.7s ease-in, opacity 1.5s"
      }
    });
  }

  render() {
    const {
      position,
      menuOpen,
      onClick,
      catInteraction,
      hasPlayer,
      transitionSpeed
    } = this.props;
    let playerImage,
      playerPostion = {},
      width,
      height;
    if (!hasPlayer && this.state.playerAction != "none")
      this.setState({ playerAction: "none" });

    switch (this.state.playerAction) {
      case "pet":
        playerImage = petgirl;
        playerPostion = {
          top: "-185px",
          left: "-120px"
        };
        // height = "285px"
        width = "168px";
        break;
      case "feed":
        playerImage = feedgirl;
        playerPostion = {
          top: "-85px",
          left: "-131px"
        };
        width = "168px";
        break;
      case "play":
        playerImage = playgirl;
        playerPostion = {
          top: "-105px",
          left: "-131px"
        };
        width = "168px";
        break;
      case "none":
        playerImage = girl;
        playerPostion = {
          top: "-278px",
          left: "-124px"
        };
        break;
    }

    let playerStyles = {
      backgroundImage: hasPlayer ? `url(${playerImage})` : "none",
      top: playerPostion.top,
      left: playerPostion.left,
      width: width,
      height: height
    };
    let dropDownOptions = [
      {
        caption: "streicheln",
        action: () => {
          catInteraction("pet");
          this.setState({ playerAction: "pet" });
        }
      },
      {
        caption: "füttern",
        action: () => {
          catInteraction("feed");
          this.setState({ playerAction: "feed" });
        }
      },
      {
        caption: "spielen",
        action: () => {
          catInteraction("play");
          this.setState({ playerAction: "play" });
        }
      },
      {
        caption: "hallucinate",
        action: () => {
          this.hallucinate();
          setTimeout(() => this.setState({ catTransform: {} }), 1000);
        }
      }
    ];
    console.log(transitionSpeed);

    let styles = {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: transitionSpeed
      // top: position.y,
      // left: position.x
    };
    return (
      <div className={"cat"} style={styles}>
        <div className={"player"} style={playerStyles}>
          {/* {hasPlayer ? "Player" : ""} */}
        </div>
        <DropDown options={dropDownOptions} visible={menuOpen} />
        <img
          src={this.state.img}
          className={"cat-image"}
          onClick={() => onClick()}
          alt={"cat"}
          style={this.state.catTransform}
        />
      </div>
    );
  }
}

export default Cat;
