import React, { Component } from "react";
import CoffeeSvg from "./SVGs/CoffeeSvg";
import coffeeboy from "./Player/coffeeboy.svg";

class CoffeeMaker extends Component {
  render() {
    const { onClick, hasPlayer } = this.props;

    return (
      <div className={"coffee-maker"}>
        {hasPlayer ? <img src={coffeeboy} className={"coffee-guy"} /> : null}
        <CoffeeSvg onClick={onClick} />
      </div>
    );
  }
}

export default CoffeeMaker;
