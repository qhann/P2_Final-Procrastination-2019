import React, { Component } from "react";
import catSit from "./Cat/catSit.svg";
import DropDown from "./DropDown";
import Player from "./Player";
import catScary from "./Cat/catScary.svg"
// import petgirl from "./Player/petgirl.svg";
// import playgirl from "./Player/playgirl.svg";
// import builtgirl from "./Player/builtgirl.svg";
// import feedgirl from "./Player/feedgirl.svg";
// import girl from "./Player/girl.svg";

class Cat extends Component {
  state = {
    img: catSit,
    menuOpen: false,
    playerAction: "none", 
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
      },
      img: catScary
      
    });
    setTimeout(() => this.setState({ catTransform: {}, img: catSit }), 200);
  }

  getPlayerStyles(playerAction) {
    let playerImage,
      playerPostion = {},
      width,
      height;

    switch (playerAction) {
      case "pet":
        // playerImage = petgirl;
        playerPostion = {
          top: "-185px",
          left: "-120px"
        };
        // height = "285px"
        width = "168px";
        break;
      case "feed":
        // playerImage = feedgirl;
        playerPostion = {
          top: "-85px",
          left: "-131px"
        };
        width = "168px";
        break;
      case "play":
        // playerImage = playgirl;
        playerPostion = {
          top: "-105px",
          left: "-131px"
        };
        width = "168px";
        break;
      case "none":
        // playerImage = girl;
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
        }
      }
    ];
  }

  render() {
    const {
      position,
      menuOpen,
      onClick,
      hasPlayer,
      transitionSpeed,
      gender,
      player,
      time } = this.props;

    if (!hasPlayer && this.state.playerAction != "none") {
      this.setState({ playerAction: "none" });
    }

    // let playerStyles = this.getPlayerStyles(this.state.playerAction);
    // player.action = this.state.playerAction
    let dropDownOptions = this.getDropDownOptions();

    let styles = {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: transitionSpeed
    };

    return (
      <div className={"cat"} style={styles}>
        {hasPlayer ? (
          <Player time={time} gender={player.gender} action={player.action} tiredness={player.tiredness} />
        ) : null}
        <DropDown options={dropDownOptions} isVisible={menuOpen} />
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
