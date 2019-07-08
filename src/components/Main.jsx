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
import Night from "./Night";

class Main extends React.Component {
  state = {
    time: 0,
    sleepTime: 0,
    tiredness: "rested",
    workingExhaustionValues: [],
    vitalStats: {
      health: 100,
      exhaustion: 0,
      coffee: 0
    },
    mentorText: "Es ist schon ziemlich spät, " + (this.props.playerName || "lol") + ".",
    room: {
      hasPlayer: true
    },
    cat: {
      hasPlayer: false,
      position: {
        x: 400,
        y: 800
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
      menuOpen: false,
      hasPlayer: false
    },
    coffee: {
      hasPlayer: false
    },
    gamingStation: {
      hasPlayer: false,
      fullscreen: false
    },
    highScores: {
      lunar: 0,
      pong: 0,
      snake: 0
    },
    frameRate: 1,
    globalInterval: {}
  };

  getGlobalInterval(time) {
    let globalInterval = setInterval(
      () => this.updateTimed(),
      250
    );
    return globalInterval
  }

  componentDidMount() {
    let globalInterval = this.getGlobalInterval(500)

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
    let time = this.state.time
    let hours = (~~(time / 60) % 12)
    let minutes = ~~(time % 60)
    // console.log(hours);

    if (hours == 11 && minutes == 59) {
      this.sleepTillMorning()
      return
    }

    this.setState(prevState => {
      let newHealth = this.updateVital("health", prevState.vitalStats.health);
      let newExhaustion = this.updateVital(
        "exhaustion",
        prevState.vitalStats.exhaustion
      );

      let newCat =
        time.toFixed(1) % 20 == 0
          ? this.moveCat(prevState.cat)
          : prevState.cat;

      let newWorkingExhaustionValues = prevState.desk.hasPlayer
        ? prevState.workingExhaustionValues.concat([prevState.vitalStats.exhaustion * ((100 - prevState.vitalStats.coffee) / 100)])
        : prevState.workingExhaustionValues

      let newCoffee = this.state.coffee.hasPlayer ? prevState.vitalStats.coffee + 5 : prevState.vitalStats.coffee - 0.5
      newCoffee = newCoffee < 0 ? 0 : newCoffee
      newCoffee = newCoffee > this.state.vitalStats.exhaustion ? this.state.vitalStats.exhaustion : newCoffee


      return update(prevState, {
        time: { $set: prevState.time + 1 },
        sleepTime: { $set: this.state.bed.hasPlayer ? prevState.sleepTime + 1 : prevState.sleepTime },
        vitalStats: {
          health: {
            $set: newHealth
          },
          exhaustion: {
            $set: newExhaustion
          },
          coffee: {
            $set: newCoffee
          }
        },
        cat: { $set: newCat },
        workingExhaustionValues: { $set: newWorkingExhaustionValues }
      });
    });
  }

  moveCat(prevCat) {
    let newCat, newPosition, dx, dy, distance, direction;
    if (this.state.cat.menuOpen || this.state.cat.hasPlayer) return prevCat;

    newPosition = {
      x: ~~(250 + 1320 * Math.random()),
      y: ~~(700 + 120 * Math.random())
    };

    dx = prevCat.position.x - newPosition.x;
    dy = prevCat.position.y - newPosition.y;
    distance = Math.sqrt(dx * dx + dy * dy);
    direction = dx > 0 ? "left" : "right";

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

    setTimeout(
      () =>
        this.setState(prevState =>
          update(prevState, {
            cat: {
              moving: { $set: false }
            }
          })
        ),
      ~~((distance / 300) * 1000)
    );

    return newCat;
  }

  updateVital(attribute, prevStat) {
    if (attribute == "exhaustion") {
      if (
        prevStat > 50 &&
        prevStat < 75 &&
        this.state.tiredness != "tired"
      ) {
        this.setState({ tiredness: "tired" });
      }
      if (prevStat > 75 && this.state.tiredness != "tiredest") {
        this.setState({ tiredness: "tiredest" });
      }
    }


    //console.log(attribute, prevStat);
    let frameDuration = 1000;
    let overExhaustion = this.state.vitalStats.exhaustion - 50
    overExhaustion = overExhaustion < 0 ? 0 : overExhaustion
    let dHealth = -overExhaustion / 96 / 2;
    let step, newStat;
    switch (attribute) {
      case "health":
        step = (dHealth) * 2;
        break;
      case "exhaustion":
        if (this.state.bed.hasPlayer) {
          step = -12.5 / 60
        } else {
          let hours = (Math.floor(this.state.time / 60) % 12 + 18) % 24
          if (hours >= 18 && hours < 22) {
            step = (6.25 / 60);
          } else {
            step = (12.5 / 60);
          }
        }
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
          hasPlayer: { $set: atBed },
          menuOpen: { $set: !atBed ? false : prevState.bed.menuOpen },
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

  handleBedClick(e) {
    e.stopPropagation()
    let bed = this.state.bed;
    this.setState(prevState => update(prevState, { bed: { menuOpen: { $set: !bed.menuOpen } } }));
    // this.playerTo("bed");
  }

  handleDeskClick(e) {
    e.stopPropagation()
    this.playerTo("desk");
  }

  sleepTillMorning() {
    this.nightFall(() => {
      let prevExhaustion = this.state.vitalStats.exhaustion
      let days = 1 + Math.floor(this.state.time / (60 * 12))
      let sleepingHours = 12 - (Math.floor(this.state.time / 60) % 12) % 24
      // console.log(sleepingHours);

      if (days == 3) {
        this.endGame()
        return
      }

      let newExhaustion = prevExhaustion - sleepingHours * 12.5
      newExhaustion = newExhaustion < 0 ? 0 : newExhaustion
      let newTime = days * 12 * 60
      let newSleepTime = this.state.sleepTime + sleepingHours * 60

      this.setState(prevState => update(prevState, {
        time: { $set: newTime },
        sleepTime: {$set: newSleepTime},
        vitalStats: {
          exhaustion: { $set: newExhaustion }
        }
      }))
      this.playerTo("room")
    })
  }

  nightFall(callBack) {
    this.playerTo("bed")
    this.setState({
      nightFall: true,
    })

    clearInterval(this.state.globalInterval)

    setTimeout(() => {
      this.setState({
        nightFall: false,
        globalInterval: this.getGlobalInterval(500)
      })
      if (typeof callBack === "function") callBack()
    }, 3000)
  }

  nap() {
    this.setState(prevState => update(prevState, {
      bed: {
        // hasPlayer: { $set: true },
        menuOpen: { $set: false }
      }
    }))
    this.playerTo("bed")
  }

  handleCatClick(e) {
    e.stopPropagation()
    let cat = this.state.cat;
    this.setState(prevState =>
      update(prevState, {
        cat: {
          menuOpen: { $set: !cat.menuOpen }
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

  handleCoffeeMakerClick(e) {
    e.stopPropagation()
    this.playerTo("coffee");
  }

  handleGameStationClick(e) {
    e.stopPropagation()
    this.playerTo("gameStation")
    this.setState({
      gamingStation: {
        fullscreen: !this.state.gamingStation.fullscreen
      }
    });
  }

  handleRoomClick() {
    this.playerTo("room");
  }

  endGame() {
    let artWorkCanvas = document.getElementById("defaultCanvas0")
    let artWork = artWorkCanvas ? artWorkCanvas.toDataURL("image/png") : null
    this.props.nextScreen({
      artWork: artWork,
      workingExhaustionValues: this.state.workingExhaustionValues,
      sleepTime: this.state.sleepTime,
      highScores: this.state.highScores
    })
  }

  setHighScore(game, score) {
    if (score > this.state.highScores[game]) {
      this.setState(prevState => update(prevState, {
        highScores: {
          [game]: { $set: score }
        }
      }))
    }

  }

  render() {
    let vitalStats = this.state.vitalStats;
    // console.log(this.state.playerAction);
    let cat = this.state.cat;
    let bed = this.state.bed;
    let desk = this.state.desk;
    let coffee = this.state.coffee;
    let gamingStation = this.state.gamingStation;
    let room = this.state.room;
    let time = ~~(this.state.time * 100) / 100;
    let player = {
      gender: this.props.gender,
      tiredness: this.state.tiredness,
      action: this.state.cat.interaction
    };

    return (
      <div className="main" onClick={() => this.handleRoomClick()}>

        <div style={{ position: "absolute" }} >
          <button onClick={() => this.endGame()}>ENDSCREEN </button>
        </div>
        <Night time={time} nightFall={this.state.nightFall} />
        <Room time={time} hasPlayer={room.hasPlayer} player={player} />
        <Cat
          hasPlayer={cat.hasPlayer}
          menuOpen={cat.menuOpen}
          player={player}
          onClick={(e) => this.handleCatClick(e)}
          catInteraction={action => this.handleCatInteraction(action)}
          position={cat.position}
          transitionSpeed={cat.transition}
          time={time}
          moving={cat.moving}
          direction={cat.direction}
        />
        <GamingStation
          hasPlayer={gamingStation.hasPlayer}
          player={{ ...player, action: "none" }}
          onClick={(e) => this.handleGameStationClick(e)}
          fullscreen={gamingStation.fullscreen}
          time={time}
          getScore={(game, score) => this.setHighScore(game, score)}
          highScores={this.state.highScores}
        />
        <Bed
          hasPlayer={bed.hasPlayer}
          menuOpen={bed.menuOpen}
          player={{ ...player, action: "sleep" }}
          onClick={(e) => this.handleBedClick(e)}
          time={time}
          sleep={() => this.sleepTillMorning()}
          nap={() => this.nap()}
        />
        <Desk
          hasPlayer={desk.hasPlayer}
          player={{ ...player, action: "build" }}
          onClick={(e) => this.handleDeskClick(e)}
          time={time}
          vitalStats={vitalStats}
        />
        <CoffeeMaker
          hasPlayer={coffee.hasPlayer}
          player={{ ...player, action: "coffee" }}
          onClick={(e) => this.handleCoffeeMakerClick(e)}
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
          coffee={vitalStats.coffee}
        />

        <Clock time={this.state.time} />
        <MentorTip text={this.state.mentorText} />
      </div>
    );
  }
}

export default Main;
