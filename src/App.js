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
import LunarLander from "./components/LunarLander";

class App extends React.Component {
  state = {
    time: 0,
    vitalStats: {
      health: 100,
      exhaustion: 0
    },
    text: "Du solltest schafen.",
    playerAction: "work",
    catPosition: {
      x: 600,
      y: 600,
      direction: true
    }
  };

  componentDidMount() {
    setInterval(() => this.updateTimed(), 500);
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
        time: { $set: prevState.time + 1 },
        vitalStats: {
          health: {
            $set: newHealth
          },
          exhaustion: {
            $set: newExhaustion
          }
        },
        text: { $set: prevState.text + "." },
        catPosition: {
          $set: newCatPostion
        }
      });
    });
  }

  moveCat(prevPos) {
    let dx = prevPos.x < 1000 ? 5 : -5;

    let newPos = update(prevPos, {
      x: { $set: prevPos.x + dx },
      y: { $set: prevPos.y }
    });

    return newPos;
  }

  updateVital(attribute, prevStat) {
    //console.log(attribute, prevStat);

    let step, newStat;
    switch (attribute) {
      case "health":
        step = -1;
        break;
      case "exhaustion":
        step = 1;
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
        <LunarLander />

        {/* <Desk player={false} />
        <Bed player={true} /> */}
      </div>
    );
  }
}

export default App;
