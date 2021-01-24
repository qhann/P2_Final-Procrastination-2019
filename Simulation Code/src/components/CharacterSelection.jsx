import React, { Component } from "react";
import Boy from "./Player/boy.svg";
import Girl from "./Player/girl.svg";
import MentorTip from "./MentorTip";

class CharacterSelection extends Component {
  state = {
    name: "",
    gender: "",
    mentorText: null
  };

  setGender(gender) {
    this.setState({ gender: gender });
  }

  setName(name) {
    this.setState({ name: name });
  }

  getMentorText() {
    let mentorText
    if (this.state.name == "") {
      mentorText = "Bitte gib deinen Namen ein."
    }
    if (this.state.gender == "") {
      mentorText = "Bitte wähle einen Charakter."
    }
    if (this.state.gender == "" && this.state.name == "") {
      mentorText = "Bitte wähle einen Charakter und gib deinen Namen ein."
    }
    this.setState({mentorText})
  }

  checkCompletion() {
    this.getMentorText()
    if (this.state.gender != "" && this.state.name != "") {
      this.props.nextScreen(this.state.gender, this.state.name)
    }
  }

  render() {
    const { nextScreen } = this.props;

    let genderHighlight = {
      filter: "drop-shadow(0px 0px 10px #FF8311)"
    };
    return (
      <div className={"character-selection"}>
        <p className={"character-title"}>Charakterauswahl</p>
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
            onClick={() => this.checkCompletion()}
          >
            Bestätigen
        </button>
        </div>
        {
          this.state.mentorText ? <MentorTip text={this.state.mentorText} /> : null
        }
        
      </div>
    );
  }
}

export default CharacterSelection;
