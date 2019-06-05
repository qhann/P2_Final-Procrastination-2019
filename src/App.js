import React from "react";
import logo from "./logo.svg";
import room from "./room.jpg";
import StatusBar from "./components/statusBar";
import "./App.css";
import update from "immutability-helper";

class App extends React.Component {
  state = {
    time: 0,
    vitalStats: {
      health: 100,
      exhaustion: 0
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
        }
      });
    });
  }

  updateVital(attribute, prevStat) {
    console.log(attribute, prevStat);

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

  render() {
    let vitalStats = this.state.vitalStats;
    return (
      <div className="App">
        <img src={room} className="room" alt="logo" />

        <StatusBar label={"health"} value={vitalStats.health} />
        <StatusBar label={"exhaustion"} value={vitalStats.exhaustion} />
      </div>
    );
  }
}

export default App;
