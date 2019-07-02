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
      filter: "drop-shadow(0px 0px 10px #FF8311)"
    };
    return (
      <div className={"character-selection"}>
        <p>Charakterauswahl:</p>
        <img
          src={Boy}
          className={"button-character-select button-boy"}
          onClick={() => this.setGender("boy")}
          style={this.state.gender == "boy" ? genderHighlight : {}}
        />
        <img
          src={Girl}
          className={"button-character-select button-girl"}
          onClick={() => this.setGender("girl")}
          style={this.state.gender == "girl" ? genderHighlight : {}}
        />
        <div className={"character-select-input"} >
          <input
            placeholder={"dein Name"}
            maxLength={25}
            className={"input-character-name"}
            onInput={e => this.setName(e.target.value)}
          />
          <button
            className={"button-character-start"}
            onClick={() => nextScreen(this.state.gender, this.state.name)}
          >
            Bestätigen
        </button>
        </div>
      </div>
    );
  }
}

export default CharacterSelection;
