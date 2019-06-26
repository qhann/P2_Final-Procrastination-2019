import React from "react";
import "./App.css";
import update from "immutability-helper";
import Room from "./components/Room";
import Intro from "./components/Intro";
import Start from "./components/Start";
import CharacterSelection from "./components/CharacterSelection";

class App extends React.Component {
  state = {
    current: "room",
    playerName: "",
    gender: ""
  };

  handleStart() {
    this.setState({ current: "characterSelection" });
  }

  handleIntroStart(gender, name) {
    if (gender && name) {
      this.setState({ current: "intro", playerName: name, gender: gender });
    } else {
      console.log("missing information");
    }
  }

  handleIntroEnd() {
    this.setState({ current: "room" });
  }

  render() {
    return (
      <div className="App">
        {this.state.current == "start" ? (
          <Start start={() => this.handleStart()} />
        ) : null}
        {this.state.current == "characterSelection" ? (
          <CharacterSelection
            startIntro={(gender, name) => this.handleIntroStart(gender, name)}
          />
        ) : null}
        {this.state.current == "intro" ? (
          <Intro
            playerName={this.state.playerName}
            endIntro={() => this.handleIntroEnd()}
          />
        ) : null}

        {this.state.current == "room" ? (
          <Room playerName={this.state.playerName} gender={this.state.gender} />
        ) : null}
      </div>
    );
  }
}

export default App;
