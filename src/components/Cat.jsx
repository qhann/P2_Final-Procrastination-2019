import React, { Component } from "react";
import cat from "./cat.svg";
import DropDown from "./DropDown";

class Cat extends Component {
  state = {
    img: cat,
    menuOpen: false
  };

  showDropDown() {
    this.setState({ menuOpen: true });
  }

  userInteraction(type) {

  }

  render() {
    const { position, menuOpen, onClick, catInteraction, hasPlayer } = this.props;
    let dropDownOptions = [
      {
        caption: "streicheln",
        action: () => {
          catInteraction("pet");
        }
      },
      {
        caption: "füttern",
        action: () => {
          catInteraction("feed");
        }
      },
      {
        caption: "spielen",
        action: () => {
          catInteraction("play");
        }
      }
    ];
    let styles = {
      transform: `translate(${position.x}px, ${position.y}px)`
      // top: position.y,
      // left: position.x
    };
    return (
      <div className={"cat"} style={styles}>
        <div className={"player"} >{hasPlayer ? "Player" : ""}</div>
        <DropDown
          options={dropDownOptions}
          visible={menuOpen}
        />
        <img
          src={this.state.img}
          className={"cat-image"}
          onClick={() => onClick()}
          alt={"cat"}
        />
      </div>
    );
  }
}

export default Cat;
