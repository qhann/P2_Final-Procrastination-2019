import React from "react";
import room from "./roomcolor.png";
import "./App.css";
import update from "immutability-helper";

import StatusBar from "./components/StatusBar";
import Artwork from "./components/Artwork";
import MentorTip from "./components/MentorTip";
import Clock from "./components/Clock";
import Cat from "./components/Cat";

class App extends React.Component {
  state = {
    time: 0,
    vitalStats: {
      health: 100,
      exhaustion: 0
    },
    text: "Du solltest schafen."
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
        },
        text: {$set: prevState.text + "."}
      });
    });
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

  render() {
    let vitalStats = this.state.vitalStats;

    return (
      <div className="App">
        <img src={room} className="room" alt="room" />

        <StatusBar label={"health"} value={vitalStats.health} />
        <StatusBar label={"exhaustion"} value={vitalStats.exhaustion} />
        <Artwork />
        <Clock time={this.state.time} />
        <MentorTip text={this.state.text}/>
        <Cat />
        {/* <Desk player={false} />
        <Bed player={true} /> */}
      </div>
    );
  }
}

export default App;
