import React from "react";
import room from "./roomcolor.png";
import "./App.css";
import update from "immutability-helper";

import StatusBar from "./components/StatusBar";
import Artwork from "./components/Artwork";
import MentorTip from "./components/MentorTip";
import Clock from "./components/Clock";
import Cat from "./components/Cat";
import GamingStation from "./components/GamingStation";
// import LunarLander from "./components/LunarLander";
import Bed from "./components/Bed";
import Desk from "./components/Desk";

class App extends React.Component {
  state = {
    time: 0,
    vitalStats: {
      health: 100,
      exhaustion: 0
    },
    text: "",
    playerAction: "work",
    catPosition: {}
  };

  componentDidMount() {
    setInterval(() => this.updateTimed(), 33);
    this.setState({
      catPosition: {
        x: 300,
        y: window.innerHeight * 0.8,
        moveRight: true
      }
    });
  }

  updateTimed() {
    this.setState(prevState => {
      let newHealth = this.updateVital("health", prevState.vitalStats.health);
      let newExhaustion = this.updateVital(
        "exhaustion",
        prevState.vitalStats.exhaustion
      );
      let newCatPostion = this.moveCat(prevState.catPosition);

      //console.log(prevState);

      return update(prevState, {
        time: { $set: prevState.time + (1 / 33) * 2 },
        vitalStats: {
          health: {
            $set: newHealth
          },
          exhaustion: {
            $set: newExhaustion
          }
        },
        text: { $set: "Du solltest Schafi, denn die Anzahl der vergangenen Minuten beträgt: " + ~~this.state.time  },
        catPosition: {
          $set: newCatPostion
        }
      });
    });
  }

  moveCat(prevPos) {
    let right, down, dx, dy, newPos

    if (prevPos.x < window.innerWidth * 0.2 || prevPos.x > window.innerWidth * 0.8) {
      right = prevPos.x < window.innerWidth * 0.5 ? true : false
    } else {
      right = prevPos.right
    }
    if (prevPos.y > window.innerHeight * 0.9 || prevPos.y < window.innerHeight * 0.6) {
      down = prevPos.y < window.innerHeight * 0.7 ? true : false
    } else {
      down = prevPos.down
    }


    dx = prevPos.right ? 1 : -1;
    dy = prevPos.down ? 1 : -1;

    newPos = update(prevPos, {
      x: { $set: prevPos.x + dx },
      y: { $set: prevPos.y  + dy},
      right: {$set: right },
      down: {$set: down}
    });

    return newPos;
  }

  updateVital(attribute, prevStat) {
    //console.log(attribute, prevStat);

    let step, newStat;
    switch (attribute) {
      case "health":
        step = (-1 / 33) * 2;
        break;
      case "exhaustion":
        step = (1 / 33) * 2;
        break;
    }

    newStat = prevStat + step;
    if (newStat >= 0 && newStat <= 100) return newStat;
    return prevStat;
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
    this.setState({vitalStats: {health: 100, exhaustion: 0}})
  }

  render() {
    let vitalStats = this.state.vitalStats;
    // console.log(this.state.playerAction);

    return (
      <div className="App">
        <img src={room} className="room" alt="room" />

        <StatusBar label={"health"} value={vitalStats.health} />
        <StatusBar label={"exhaustion"} value={vitalStats.exhaustion} />
        <Artwork
          onClick={() => this.toggleWorking()}
          working={this.state.playerAction === "work"}
        />
        <Clock time={this.state.time} />
        <MentorTip text={this.state.text} />
        <Cat position={this.state.catPosition} />
        <GamingStation />
        <Bed onClick={() => this.handleBedClick()}/>
        <Desk />
        {/* <Desk player={false} />
        <Bed player={true} /> */}
      </div>
    );
  }
}

export default App;
