import React, { Component } from "react";
import DropDown from "./DropDown";
import Player from "./Player";
import catScary from "./Cat/catScary.svg"
import catScarySprites from "./Cat/catScarySprites.svg"
import shriek from "./sounds/shriek.wav"

import catWalkSitStand from "./Cat/catWalk.svg"
// import catWalk_2 from "./Cat/catWalk-2.svg"
// import catWalkSprite from "./Cat/catWalkSprites.svg"
import catPet from "./Cat/catPet.svg"
// import catPet_2 from "./Cat/catPet-2.svg"
import catPlay from "./Cat/catPlay.svg"
// import catPlay_2 from "./Cat/catPlay-2.svg"
import catEat from "./Cat/catEat.svg"
// import catEat_2 from "./Cat/catEat-2.svg"
import catSit from "./Cat/catSit.svg"
import catStand from "./Cat/catStand.svg"

class Cat extends Component {
  state = {
    img: catSit,
    menuOpen: false,
    playerAction: "none",
    catTransform: {},
    shriek: new Audio(shriek),
  };

  showDropDown() {
    this.setState({ menuOpen: true });
  }

  componentDidMount() {
  }

  hallucinate() {
    this.setState({
      img: catScarySprites,
      catTransform: {
        // transform: "scale(150)",
        // opacity: "0",
        backgroundSize: "150px 150px",
        transition: "transform 0.4s, opacity 1.5s",
        backgroundPositionX: "-150px",
        animationName: "halluciCat",
        transformOrigin: "75px 140px",
        pointerEvents: "none"
      },
    });
    setTimeout(() => {
      this.state.shriek.play()
      this.setState({
        catTransform:
        {
          animationName: "halluciCat",
          transformOrigin: "50px 140px",
          backgroundPositionX: "0px",
        }
      })
    }, 800);
    setTimeout(() => this.setState({ catTransform: {} }), 2000);
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
        }
      },
      {
        caption: "füttern",
        action: () => {
          this.props.catInteraction("feed");
        }
      },
      {
        caption: "spielen",
        action: () => {
          this.props.catInteraction("play");
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

  getCatImage(player, time) {
    let cat = {
      feed: catEat,
      pet: catPet,
      play: catPlay,
      stand: catStand,
      sit: catSit,
      walk: catWalk
    }
    let useImage, useStyle, frameDuration, isSprite, timerHasChanged, bgSize

    if (player.action != "none") {
      useImage = cat[player.action]
      frameDuration = 6
      isSprite = true
    } else {
      useImage = catWalkSitStand
      if (this.props.moving) {
        frameDuration = 1
        isSprite = true
        bgSize = 600
      } else {
        useImage = cat.sit
      }
    }
    let timer = (time.toFixed(1) % (frameDuration || 1) >= (frameDuration / 2 || 0.5))
    // console.log(timer, this.state.timer);
    
    if (isSprite && timer != this.state.timer) {
      this.setState({ timer })
      timerHasChanged = true
    } else {
      timerHasChanged = false
    }

    if (isSprite && timerHasChanged) {
      useStyle = {
        catTransform: {
          backgroundSizeX: bgSize +"px",
          backgroundPositionX: this.state.timer ?  "0px" : "-150px" 
        }
      }
    }

    return {image: useImage, style: useStyle}
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

    let catImage = this.getCatImage(player, time)

    return (
      <div className={"cat"} style={styles}>
        {hasPlayer ? (
          <Player time={time} gender={player.gender} action={player.action} tiredness={player.tiredness} />
        ) : null}
        <DropDown options={dropDownOptions} isVisible={menuOpen} />
        <div
          // src={this.state.img}
          className={"cat-image"}
          onClick={() => onClick()}
          style={{
            ...this.state.catTransform,
            ...catImage.style,
            backgroundImage: `url(${catImage.image})`
          }}
        />
      </div>
    );
  }
}

export default Cat;
