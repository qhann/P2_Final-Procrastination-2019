import React from "react";
import "./App.css";
import update from "immutability-helper";
import Room from "./components/Room";
import Intro from "./components/Intro";

class App extends React.Component {
  state = {
    current: "room"
  }
  

  handleIntroEnd() {
    this.setState({current: "room"})
  }

  render() {

    return (
      <div className="App">
          { this.state.current == "intro" ? <Intro endIntro={() => this.handleIntroEnd()}/> : null}
          { this.state.current == "room" ? <Room /> : null}
      </div>
    );
  }
}

export default App;
