import React from "react";
import "./App.css";
import update from "immutability-helper";

import Main from "./components/Main";
import Intro from "./components/Intro";
import Start from "./components/Start";
import CharacterSelection from "./components/CharacterSelection";
import EndScreen from "./components/EndScreen";

class App extends React.Component {
  state = {
    currentScreen: "start",
    playerName: "[playerName]",
    gender: "boy",
    player: {},
    artWork: {}
  };

  switchScreen(destination, props) {
    let newScreen, newProps;
    switch (destination) {
      case "start":
        newScreen = "start";
        break;
      case "characterSelection":
        newScreen = "characterSelection";
        break;
      case "intro":
        if (props.name && props.gender) {
          newScreen = "intro";
          newProps = { playerName: props.name, gender: props.gender };
        }
        break;
      case "main":
        newScreen = "main";
        break;
      case "end":
        newProps = {
          artWork: props.artWork,
          workingExhaustion:
            props.workingExhaustionValues.reduce((a, b) => a + b, 0) /
            props.workingExhaustionValues.length,
          workTime: props.workingExhaustionValues.length,
          sleepTime: props.sleepTime,
          highScores: props.highScores
        };
        newScreen = "end";
        break;
    }
    if (newScreen) {
      this.setState({ currentScreen: newScreen, ...newProps });
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.currentScreen == "start" ? (
          <Start nextScreen={() => this.switchScreen("characterSelection")} />
        ) : null}
        {this.state.currentScreen == "characterSelection" ? (
          <CharacterSelection
            nextScreen={(gender, name) =>
              this.switchScreen("intro", { gender, name })
            }
          />
        ) : null}
        {this.state.currentScreen == "intro" ? (
          <Intro
            playerName={this.state.playerName}
            nextScreen={() => this.switchScreen("main")}
          />
        ) : null}
        {this.state.currentScreen == "main" ? (
          <Main
            playerName={this.state.playerName}
            gender={this.state.gender}
            nextScreen={artWork => this.switchScreen("end", artWork)}
          />
        ) : null}
        {this.state.currentScreen == "end" ? (
          <EndScreen
            playerName={this.state.playerName}
            gender={this.state.gender}
            artWork={this.state.artWork}
            workingExhaustion={this.state.workingExhaustion}
            workTime={this.state.workTime}
            sleepTime={this.state.sleepTime}
            highScores={this.state.highScores}
            nextScreen={() => this.switchScreen("start")}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
