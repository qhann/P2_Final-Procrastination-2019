import React from "react";
import update from "immutability-helper";

import Room from "./Room";
import Bed from "./Bed";
import Desk from "./Desk";
import Cat from "./Cat";
import GamingStation from "./GamingStation";
import CoffeeMaker from "./CoffeeMaker";

import Clock from "./Clock";
import StatusBar from "./StatusBar";
import MentorTip from "./MentorTip";
import Window from "./Window";


class Main extends React.Component {
  state = {
    time: 609,
    tiredness: "rested",
    vitalStats: {
      health: 100,
      exhaustion: 0
    },
    mentorText: "Hefte raus, Klassenarbeit!",
    room: {
      hasPlayer: false
    },
    cat: {
      hasPlayer: false,
      position: {
        x: 0,
        y: 0
      },
      moving: false,
      menuOpen: false,
      interaction: "none",
      direction: "left"
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
    frameRate: 6,
    globalInterval: {},
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
      let newCat =
        this.state.time.toFixed(1) % 10 == 0
          ? this.moveCat(prevState.cat)
          : prevState.cat;

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
    let newCat, newPosition, dx, dy, distance, direction;
    if (this.state.cat.menuOpen || this.state.cat.hasPlayer) return prevCat;

    newPosition = {
      x: ~~(150 + 1520 * Math.random()),
      y: ~~(800 + 150 * Math.random())
    };

    dx = prevCat.position.x - newPosition.x;
    dy = prevCat.position.y - newPosition.y;
    distance = Math.sqrt(dx * dx + dy * dy);
    direction = dx > 0 ? "left" : "right"

    newCat = update(prevCat, {
      position: {
        x: { $set: newPosition.x },
        y: { $set: newPosition.y }
      },
      transition: { $set: `transform ${distance / 300}s linear` },
      moving: { $set: true },
      direction: { $set: direction }
    });

    // console.log(~~(distance / 400 * 1000));

    setTimeout(() => this.setState(prevState => (
      update(prevState, {
        cat: {
          moving: { $set: false }
        }
      })
    )),
      ~~(distance / 300 * 1000)
    )

    return newCat;
  }

  updateVital(attribute, prevStat) {

    if (prevStat.exhaustion > 50 && prevStat.exhaustion < 75 && this.state.tiredness != "tired") {
      this.setState({ tiredness: "tired" })
    }
    if (prevStat.exhaustion > 75 && this.state.tiredness != "tiredest") {
      this.setState({ tiredness: "tiredest" })
    }

    //console.log(attribute, prevStat);
    let frameDuration = 1000 / this.state.frameRate;
    let dHealth = (prevStat.exhaustion - 50) / 12
    let step, newStat;
    switch (attribute) {
      case "health":
        step = (dHealth / this.state.frameRate) * 2;
        break;
      case "exhaustion":
        step = (6.25 / 60 / this.state.frameRate) * 2;
        break;
    }

    newStat = prevStat + step;
    if (newStat >= 0 && newStat <= 100) return newStat;
    return prevStat;
  }

  playerTo(place) {
    let atRoom = false;
    let atDesk = false;
    let atBed = false;
    let atCat = false;
    let atCoffee = false;
    let atGameStation = false;
    switch (place) {
      case "room":
        atRoom = true;
        break;
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
        room: {
          hasPlayer: { $set: atRoom }
        },
        desk: {
          hasPlayer: { $set: atDesk }
        },
        bed: {
          hasPlayer: { $set: atBed }
        },
        cat: {
          hasPlayer: { $set: atCat },
          menuOpen: { $set: !atCat ? false : prevState.cat.menuOpen },
          interaction: { $set: !atCat ? "none" : prevState.cat.interaction }
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
          // moving: { $set: cat.menuOpen }
        }
      })
    );
    // this.playerTo("cat");
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
    // setTimeout(() => this.setState(prevState => {update(prevState, {cat: {}})}))
    this.setState(prevState =>
      update(prevState, {
        cat: {
          menuOpen: { $set: false },
          // moving: { $set: true },
          interaction: { $set: type },
          direction: { $set: "left" }
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

  handleRoomClick() {
    this.playerTo("room")
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
    let player = {
      gender: this.props.gender,
      tiredness: this.state.tiredness,
      action: this.state.cat.interaction
    }

    return (
      <div className="main">
        <Room time={time} />
        <Cat
          hasPlayer={cat.hasPlayer}
          player={player}
          onClick={() => this.handleCatClick()}
          catInteraction={action => this.handleCatInteraction(action)}
          position={cat.position}
          transitionSpeed={cat.transition}
          menuOpen={cat.menuOpen}
          time={time}
          moving={cat.moving}
          direction={cat.direction}
        />
        <GamingStation
          hasPlayer={gamingStation.hasPlayer}
          player={{ ...player, action: "none" }}
          onClick={() => this.handleGameStationClick()}
          fullscreen={gamingStation.fullscreen}
          time={time}
        />
        <Bed
          hasPlayer={bed.hasPlayer}
          player={{ ...player, action: "sleep" }}
          onClick={() => this.handleBedClick()}
          time={time}
        />
        <Desk
          hasPlayer={desk.hasPlayer}
          player={{ ...player, action: "build" }}
          onClick={() => this.handleDeskClick()}
          time={time}
          vitalStats={vitalStats}
        />
        <CoffeeMaker
          hasPlayer={coffee.hasPlayer}
          player={{ ...player, action: "coffee" }}
          onClick={() => this.handleCoffeeMakerClick()}
          time={time}
        />
        <Window time={~~this.state.time} />
        <StatusBar
          label={"Gesundheit"}
          selector={"health"}
          value={~~vitalStats.health}
        />
        <StatusBar
          label={"Erschöpfung"}
          selector={"exhaustion"}
          value={~~vitalStats.exhaustion}
        />

        <Clock time={this.state.time} />
        <MentorTip text={this.state.mentorText} />
      </div>
    );
  }
}

export default Main;
