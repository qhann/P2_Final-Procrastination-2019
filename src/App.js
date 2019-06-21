import React from "react";
import room from "./roomwide.png";
import "./App.css";
import update from "immutability-helper";
import jQuery from "jquery";

import StatusBar from "./components/StatusBar";
import Artwork from "./components/Artwork";
import MentorTip from "./components/MentorTip";
import Clock from "./components/Clock";
import Cat from "./components/Cat";
import GamingStation from "./components/GamingStation";
import Bed from "./components/Bed";
import Desk from "./components/Desk";
import Window from "./components/Window";
import CoffeeMaker from "./components/CoffeeMaker";

class App extends React.Component {
  state = {
    time: 0,
    vitalStats: {
      health: 100,
      exhaustion: 0
    },
    mentorText: "You should sleep",
    cat: {
      hasPlayer: false,
      position: {
        x: 0,
        y: 0
      },
      moving: true,
      direction: {
        x: 1,
        y: 1
      },
      menuOpen: false
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
    frameRate: 30,
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

    /*
     * Replace all SVG images with inline SVG
     */
    jQuery("img.svg").each(function() {
      var $img = jQuery(this);
      var imgID = $img.attr("id");
      var imgClass = $img.attr("class");
      var imgURL = $img.attr("src");

      jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find("svg");

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr("xmlns:a");

        // Replace image with new SVG
        $img.replaceWith($svg);

        // Add an handler
        jQuery("path").each(function() {
          jQuery(this).click(function() {
            alert(jQuery(this).attr("id"));
          });
        });
      });
    });
  }

  componentWillUnmount() {
    clearImmediate(this.state.globalInterval);
  }

  updateTimed() {
    let frameDuration = 1000 / this.state.frameRate;
    this.setState(prevState => {
      let newHealth = this.updateVital("health", prevState.vitalStats.health);
      let newExhaustion = this.updateVital(
        "exhaustion",
        prevState.vitalStats.exhaustion
      );
      let newCat = this.moveCat(prevState.cat);

      //console.log(prevState);

      return update(prevState, {
        time: { $set: prevState.time + (1 / frameDuration) * 2 },
        vitalStats: {
          health: {
            $set: newHealth
          },
          exhaustion: {
            $set: newExhaustion
          }
        },
        // mentorText: {
        //   $set:
        //     "Du solltest Schafi, denn die Anzahl der vergangenen Minuten beträgt: " +
        //     ~~this.state.time
        // },
        cat: { $set: newCat }
      });
    });
  }

  moveCat(prevCat) {
    let dx, dy, newPos;
    let newDirection = {};
    if (!this.state.cat.moving) return prevCat;

    if (
      prevCat.position.x < 1920 /*window.innerWidth*/ * 0.2 ||
      prevCat.position.x > 1920 /*window.innerWidth*/ * 0.6
    ) {
      newDirection.x =
        prevCat.position.x < 1920 /*window.innerWidth*/ * 0.5 ? true : false;
    } else {
      newDirection.x = prevCat.direction.x;
    }
    if (
      prevCat.position.y > 1080 /*window.innerHeight*/ * 0.9 ||
      prevCat.position.y < 1080 /*window.innerHeight*/ * 0.6
    ) {
      newDirection.y =
        prevCat.position.y < 1080 /*window.innerHeight*/ * 0.7 ? true : false;
    } else {
      newDirection.y = prevCat.direction.y;
    }

    dx = newDirection.x ? 1 : -1;
    dy = newDirection.y ? 1 : -1;

    newPos = update(prevCat, {
      position: {
        x: { $set: ~~(prevCat.position.x + dx) },
        y: { $set: ~~(prevCat.position.y + dy) }
      },
      direction: {
        x: { $set: newDirection.x },
        y: { $set: newDirection.y }
      }
    });

    return newPos;
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

  toggleWorking() {
    console.log("toggle");

    let newAction;
    if (this.state.playerAction === "work") {
      newAction = null;
    } else {
      newAction = "work";
    }
    this.setState({ playerAction: newAction });
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
    this.playerTo("coffee");
  }

  render() {
    let vitalStats = this.state.vitalStats;
    // console.log(this.state.playerAction);
    let cat = this.state.cat;
    let bed = this.state.bed;
    let desk = this.state.desk;
    let coffee = this.state.coffee;
    let gamingStation = this.state.gamingStation;

    return (
      <div className="App">
        <img src={room} className="room" alt="room" />
        <Window time={this.state.time} />
        <StatusBar label={"health"} value={vitalStats.health} />
        <StatusBar label={"exhaustion"} value={vitalStats.exhaustion} />
        <Artwork
          onClick={() => this.toggleWorking()}
          working={this.state.playerAction === "work"}
        />
        <Clock time={this.state.time} />
        <MentorTip text={this.state.mentorText} />
        <Cat
          hasPlayer={cat.hasPlayer}
          onClick={() => this.handleCatClick()}
          catInteraction={action => this.handleCatInteraction(action)}
          position={cat.position}
          menuOpen={cat.menuOpen}
        />
        <GamingStation
          hasPlayer={gamingStation.hasPlayer}
          onClick={() => this.handleGameStationClick()}
          fullscreen={gamingStation.fullscreen}
        />
        <Bed hasPlayer={bed.hasPlayer} onClick={() => this.handleBedClick()} />
        <Desk
          hasPlayer={desk.hasPlayer}
          onClick={() => this.handleDeskClick()}
        />
        <CoffeeMaker onClick={() => this.handleCoffeeMakerClick()} />
      </div>
    );
  }
}

export default App;
