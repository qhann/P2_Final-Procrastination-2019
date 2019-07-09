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
    img: catWalkSitStand,
    menuOpen: false,
    playerAction: "none",
    catTransform: {},
    shriek: new Audio(shriek),
  };

  componentDidMount() {
    let hallucinationInterval = setInterval(
      () => this.hallucinate(),
      5000
    ); 

    this.setState({hallucinationInterval})
  }

  componentWillUnmount() {
    clearInterval(this.state.hallucinationInterval);
  }

  showDropDown() {
    this.setState({ menuOpen: true });
  }

  hallucinate() {
    if (this.props.player.tiredness != "tiredest") {
      this.setState({hallucinated: false})
    }
    if (Math.random() < 0.5 
    || this.props.player.action != "none" 
    || this.props.player.tiredness != "tiredest" 
    || this.state.hallucinated
    || this.props.denyHallucination) {
      return
    }

    console.log("hallu");
    
    
    this.setState({
      hallucinated: true,
      // img: catScarySprites,
      catTransform: {
        // transform: "scale(150)",
        // opacity: "0",
        // backgroundSize: "150px 150px",
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
        hallucinate: true,
        catTransform:
        {
          animationName: "halluciCat",
          transformOrigin: "50px 140px",
          backgroundPositionX: "-450px",
        }
      })
    }, 800);
    setTimeout(() => this.setState({ catTransform: {}, hallucinate: false }), 2000);
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
    ];
  }

  getCatImage(player, time) {
    let cat = {
      feed: catEat,
      pet: catPet,
      play: catPlay,
      stand: catStand,
      sit: catSit,
      // walk: catWalk
    }

    let useImage, useStyle, useScale, frameDuration, isSprite, timerHasChanged, spriteCount, spriteWidth
    if (player.action != "none") {
      useImage = cat[player.action]
      frameDuration = 6
      isSprite = true
      spriteCount = 2
      switch (player.action) {
        case "play":
          // useScale = 1.3
          spriteWidth = 200
          break;
        case "pet":
          useScale = 1.2
          spriteWidth = 100
          break;
        case "feed":
          spriteWidth = 154
          break;
      }
    } else {
      useImage = catWalkSitStand
      spriteCount = 5
      spriteWidth = 150
      if (this.props.moving) {
        isSprite = true
        frameDuration = 2
      } else {
        useStyle = {
          backgroundSize: `${spriteCount * spriteWidth}px 150px`,
          backgroundPositionX: "-290px",
        }
      }
    }
    let timer = (time.toFixed(1) % (frameDuration || 1) >= (frameDuration / 2 || 0.5))
    // console.log(time.toFixed(1), timer, this.state.timer);

    if (isSprite && timer != this.state.timer) {
      this.setState({ timer })
      timerHasChanged = true
    } else {
      timerHasChanged = false
    }

    if (isSprite) {
      useStyle = {
        backgroundSize: `${spriteCount * spriteWidth}px ${150}px`,
        backgroundPositionX: this.state.timer ? "0px" : `-${spriteWidth}px`,
        width: `${spriteWidth}px`
      }
    }

    if (this.state.hallucinate) {
      useStyle.backgroundPositionX = "-590px"
      // useImage = catWalkSitStand
    }
    return { image: useImage, style: useStyle, scale: useScale || 1 }
  }

  render() {
    const {
      position,
      menuOpen,
      onClick,
      hasPlayer,
      transitionSpeed,
      player,
      time,
      direction } = this.props;

    if (!hasPlayer && this.state.playerAction != "none") {
      this.setState({ playerAction: "none" });
    }

    let catImage = this.getCatImage(player, time)

    let directionStyle = {
      transform: `scale(${direction == "left" ? catImage.scale : -catImage.scale}, ${catImage.scale})`
    }

    let pLoc = this.props.player.playerLocation
    let playerFeetY = pLoc == "room" ? 790 : (pLoc == "desk" ? 750 : (pLoc == "coffee" ? 550 : 0) ) 

    let styles = {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: transitionSpeed,
      zIndex: position.y < playerFeetY ? "9" : "11"
    };

    return (
      <div className={"cat"} style={styles}>
        {hasPlayer ? (
          <Player time={time} gender={player.gender} action={player.action} tiredness={player.tiredness} />
        ) : null}
        {menuOpen ?
          <DropDown options={this.getDropDownOptions()} />
          : null
        }
        <div>
          <div
            // src={this.state.img}
            className={"cat-image"}
            onClick={(e) => onClick(e)}
            style={{
              ...directionStyle,
              ...this.state.catTransform,
              ...catImage.style,
              backgroundImage: `url(${catImage.image})`
            }}
          />
        </div>
      </div>
    );
  }
}

Cat.defaultProps = {
  onClick: () => {},
  player: {
    action: "none"
  }
}

export default Cat;
