import React, { Component } from "react";
import CoffeeSvg from "./CoffeeSvg"

class CoffeeMaker extends Component {
    render() {
        const { onClick, hasPlayer } = this.props;

        return (
            <div className={"coffee-maker"} onClick={onClick}>
                <div className={"player"} >{hasPlayer ? "Player" : ""}</div>

                <CoffeeSvg onClick={onClick} />
            </div>
        );
    }
}

export default CoffeeMaker;
