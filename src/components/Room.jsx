import React from "react";
import update from "immutability-helper";

import Bed from "./Bed";
import Desk from "./Desk";
import Cat from "./Cat";
import GamingStation from "./GamingStation";
import CoffeeMaker from "./CoffeeMaker";

import Clock from "./Clock";
import StatusBar from "./StatusBar";
import MentorTip from "./MentorTip";
import Window from "./Window";
import Moonlight from "./Moonlight";

import room from "./roomwide.png";
import roomMask from "./Masks/room-mask.png";

class Room extends React.Component {
  state = {
    time: 0,
    vitalStats: {
      health: 100,
      exhaustion: 0
    },
    mentorText:
      "Hefte raus, Klassenarbeit!",
    cat: {
      hasPlayer: false,
      position: {
        x: 0,
        y: 0
      },
      moving: true,
      menuOpen: false,
      interaction: "none"
    },
    desk: {
      hasPlayer: false,
      completion: 0
    },
    bed: {
      hasPlayer: false
    },
    coffee: {
      hasPlayer: false
    },
    gamingStation: {
      hasPlayer: false,
      fullscreen: false
    },
    frameRate: 15,
    globalInterval: {}
  };

  componentDidMount() {
    let globalInterval = setInterval(
      () => this.updateTimed(),
      1000 / this.state.frameRate
    );

    this.setState(prevState =>
      update(prevState, {
        cat: {
          position: {
            x: { $set: 300 },
            y: { $set: 1080 /*window.innerHeight*/ * 0.8 }
          }
        },
        globalInterval: { $set: globalInterval }
      })
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.globalInterval);
  }

  updateTimed() {
    this.setState(prevState => {
      let newHealth = this.updateVital("health", prevState.vitalStats.health);
      let newExhaustion = this.updateVital(
        "exhaustion",
        prevState.vitalStats.exhaustion
      );
      let newCat = this.state.time.toFixed(1) % 24 == 0 ? this.moveCat(prevState.cat) : prevState.cat;

      return update(prevState, {
        time: { $set: prevState.time + (1 / this.state.frameRate) * 2 },
        vitalStats: {
          health: {
            $set: newHealth
          },
          exhaustion: {
            $set: newExhaustion
          }
        },
        cat: { $set: newCat }
      });
    });
  }

  moveCat(prevCat) {
    let newCat, newPosition, dx, dy, distance;
    if (!this.state.cat.moving) return prevCat;

    newPosition = {
      x: 150 + 1520 * Math.random(),
      y: 800 + 150 * Math.random(),
    }

    dx = prevCat.position.x - newPosition.x
    dy = prevCat.position.y - newPosition.y
    distance = Math.sqrt( dx*dx + dy*dy )  

    newCat = update(prevCat, {
      position: {
        x: { $set: newPosition.x },
        y: { $set: newPosition.y }
      },
      transition: {$set: `transform ${distance/400}s linear`}
    });

    return newCat;
  }

  updateVital(attribute, prevStat) {
    //console.log(attribute, prevStat);
    let frameDuration = 1000 / this.state.frameRate;

    let step, newStat;
    switch (attribute) {
      case "health":
        step = (-1 / frameDuration) * 2;
        break;
      case "exhaustion":
        step = (1 / frameDuration) * 2;
        break;
    }

    newStat = prevStat + step;
    if (newStat >= 0 && newStat <= 100) return newStat;
    return prevStat;
  }

  playerTo(place) {
    let atDesk = false;
    let atBed = false;
    let atCat = false;
    let atCoffee = false;
    let atGameStation = false;
    switch (place) {
      case "desk":
        atDesk = true;
        break;
      case "bed":
        atBed = true;
        break;
      case "cat":
        atCat = true;
        break;
      case "gameStation":
        atGameStation = true;
        break;
      case "coffee":
        atCoffee = true;
        break;
    }

    this.setState(prevState =>
      update(prevState, {
        desk: {
          hasPlayer: { $set: atDesk }
        },
        bed: {
          hasPlayer: { $set: atBed }
        },
        cat: {
          hasPlayer: { $set: atCat }
        },
        gamingStation: {
          hasPlayer: { $set: atGameStation }
        },
        coffee: {
          hasPlayer: { $set: atCoffee }
        }
      })
    );
  }

  handleBedClick() {
    this.setState({ vitalStats: { health: 100, exhaustion: 0 } });
    this.playerTo("bed");
  }

  handleDeskClick() {
    this.playerTo("desk");
  }

  handleCatClick() {
    let cat = this.state.cat;
    this.setState(prevState =>
      update(prevState, {
        cat: {
          menuOpen: { $set: !cat.menuOpen },
          moving: { $set: cat.menuOpen }
        }
      })
    );
    this.playerTo("cat");
  }

  handleCatInteraction(type) {
    let mentorText;
    switch (type) {
      case "pet":
        console.log("pet");
        mentorText = "Aww, you pet your cat. That's nice. Purrr.";
        break;
      case "feed":
        console.log("feed");
        mentorText = "You feed your cat. Your cat is getting fatter.";
        break;
      case "play":
        console.log("play");
        mentorText = "You play with the cat. It's happy ^_^";
        break;
      default:
        console.log("unkown action");
        mentorText = "WAT?!";
    }
    this.playerTo("cat");
    this.setState(prevState =>
      update(prevState, {
        cat: {
          menuOpen: { $set: false },
          moving: { $set: true }
        },
        mentorText: { $set: mentorText }
      })
    );
  }

  handleCoffeeMakerClick() {
    console.log("coffee");

    this.playerTo("coffee");
  }

  handleGameStationClick() {
    this.setState({
      gamingStation: {
        hasPlayer: true,
        fullscreen: !this.state.gamingStation.fullscreen
      }
    });
  }

  render() {
    let vitalStats = this.state.vitalStats;
    // console.log(this.state.playerAction);
    let cat = this.state.cat;
    let bed = this.state.bed;
    let desk = this.state.desk;
    let coffee = this.state.coffee;
    let gamingStation = this.state.gamingStation;
    let time = ~~(this.state.time * 100) / 100;

    return (
      <div className="Room">
        <img src={room} className="room" alt="room" />
        <Moonlight time={time} selector={"room"} mask={roomMask} />

        <Window time={~~this.state.time} />
        <StatusBar label={"Gesundheit"} selector={"health"} value={~~vitalStats.health} />
        <StatusBar label={"Erschöpfung"} selector={"exhaustion"} value={~~vitalStats.exhaustion} />

        <Clock time={this.state.time} />
        <MentorTip text={this.state.mentorText} />
        <Cat
          hasPlayer={cat.hasPlayer}
          onClick={() => this.handleCatClick()}
          catInteraction={action => this.handleCatInteraction(action)}
          position={cat.position}
          transition={cat.transition}
          menuOpen={cat.menuOpen}
        />
        <GamingStation
          hasPlayer={gamingStation.hasPlayer}
          onClick={() => this.handleGameStationClick()}
          fullscreen={gamingStation.fullscreen}
          time={time}
        />
        <Bed
          hasPlayer={bed.hasPlayer}
          onClick={() => this.handleBedClick()}
          time={time}
        />
        {/* <BedLowerSvg/> */}

        <Desk
          hasPlayer={desk.hasPlayer}
          onClick={() => this.handleDeskClick()}
          time={time}
        />
        <CoffeeMaker
          hasPlayer={coffee.hasPlayer}
          onClick={() => this.handleCoffeeMakerClick()}
        />
      </div>
    );
  }
}

export default Room;
