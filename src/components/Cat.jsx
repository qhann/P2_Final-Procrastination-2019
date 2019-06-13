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

  pet() {
    console.log("an action: pet");
  }

  feed() {
    console.log("an action: feed");
  }

  play() {
    console.log("an action: play");
  }

  render() {
    let dropDownOptions = [
      {
        caption: "streicheln",
        action: () => {
          this.pet();
        }
      },
      {
        caption: "füttern",
        action: () => {
          this.feed();
        }
      },
      {
        caption: "spielen",
        action: () => {
          this.play();
        }
      }
    ];

    return (
      <div className={"cat"}>
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
