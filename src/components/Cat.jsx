import React, { Component } from "react";
import cat from "./cat.svg";
import cat2 from "./cat2.jpg";
import DropDown from "./DropDown";

class Cat extends Component {
  state = {
    img: cat,
    dropDownVisible: false
  };

  showDropDown() {
    this.setState({ dropDownVisible: true });
  }

  userInteraction(type) {
    switch (type) {
      case "pet":
        console.log("pet");
        break;
      case "feed":
        console.log("feed");
        break;
      case "play":
        console.log("play");
        break;
    }
    this.setState({ dropDownVisible: false })
  }

  render() {
    const {position} = this.props
    let dropDownOptions = [
      {
        caption: "streicheln",
        action: () => {
          this.userInteraction("pet");
        }
      },
      {
        caption: "füttern",
        action: () => {
          this.userInteraction("feed");
        }
      },
      {
        caption: "spielen",
        action: () => {
          this.userInteraction("play");
        }
      }
    ];
    let styles = {
      top: position.y,
      left: position.x
    }
    return (
      <div className={"cat"} style={styles}>
        <DropDown
          options={dropDownOptions}
          visible={this.state.dropDownVisible}
        />
        <img
          src={this.state.img}
          className={"cat-image"}
          onClick={() => this.showDropDown()}
          alt={"cat"}
        />
      </div>
    );
  }
}

export default Cat;
