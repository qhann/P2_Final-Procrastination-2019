import React, { Component } from "react";
import CoffeeSvg from "./SVGs/CoffeeSvg"

class CoffeeMaker extends Component {
    render() {
        const { onClick, hasPlayer } = this.props;

        return (
            <div className={"coffee-maker"}>
                <div className={"player"} >{hasPlayer ? "Player" : ""}</div>

                <CoffeeSvg onClick={onClick} />
            </div>
        );
    }
}

export default CoffeeMaker;
