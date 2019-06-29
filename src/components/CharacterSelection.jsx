import React, { Component } from "react";
import Boy from "./Player/boy.svg";
import Girl from "./Player/girl.svg";

class CharacterSelection extends Component {
  state = {
    name: "",
    gender: ""
  };

  setGender(gender) {
    this.setState({ gender: gender });
  }

  setName(name) {
    this.setState({ name: name });
  }

  render() {
    const { nextScreen } = this.props;

    let genderHighlight = {
      filter: "drop-shadow(5px 5px 10px red)"
    };
    return (
      <div className={"character-selection"}>
        <p>Charakterauswahl:</p>
        <img
          src={Boy}
          className={"button-character-select button-playboy"}
          onClick={() => this.setGender("male")}
          style={this.state.gender == "boy" ? genderHighlight : {}}
        />
        <img
          src={Girl}
          className={"button-character-select button-playgirl"}
          onClick={() => this.setGender("female")}
          style={this.state.gender == "girl" ? genderHighlight : {}}
        />
        <input
          maxLength={25}
          className={"input-character-name"}
          onInput={e => this.setName(e.target.value)}
        />
        <button
          className={"button-character-start"}
          onClick={() => nextScreen(this.state.gender, this.state.name)}
        >
          Intro
        </button>
      </div>
    );
  }
}

export default CharacterSelection;
