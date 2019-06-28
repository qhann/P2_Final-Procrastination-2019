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
    playerAction: builtgirl,
    catTransform: {}
  };


  showDropDown() {
    this.setState({ menuOpen: true });
  }

  hallucinate() {
    this.setState({
      catTransform: {
        transform: "scale(150)",
        opacity: "0",
        transition: "transform 0.7s ease-in, opacity 1.5s"
      }
    })
  }

  getPlayerStyles(playerAction) {
    let playerImage,
      playerPostion = {},
      width,
      height;

    switch (playerAction) {
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

    return {
      backgroundImage: this.props.hasPlayer ? `url(${playerImage})` : "none",
      top: playerPostion.top,
      left: playerPostion.left,
      width: width,
      height: height
    };
  }

  getDropDownOptions() {
    return [
      {
        caption: "streicheln",
        action: () => {
          this.props.catInteraction("pet");
          this.setState({ playerAction: "pet" });
        }
      },
      {
        caption: "füttern",
        action: () => {
          this.props.catInteraction("feed");
          this.setState({ playerAction: "feed" });
        }
      },
      {
        caption: "spielen",
        action: () => {
          this.props.catInteraction("play");
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
  }

  render() {
    const { position, menuOpen, onClick, hasPlayer, transitionSpeed } = this.props;

    if (!hasPlayer && this.state.playerAction != "none") {
      this.setState({ playerAction: "none" });
    }

    let playerStyles = this.getPlayerStyles(this.state.playerAction)
    let dropDownOptions = this.getDropDownOptions()

    let styles = {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: transitionSpeed
    };

    return (
      <div className={"cat"} style={styles}>
        <div className={"player"} style={playerStyles}>
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
