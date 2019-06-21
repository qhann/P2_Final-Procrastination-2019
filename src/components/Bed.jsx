import React, { Component } from "react";
import bedImage from "./bed.svg"

class Bed extends Component {
    render() {
        const { onClick, hasPlayer } = this.props;


        return (
            <div className={"bed"} onClick={onClick}>
                <div className={"player"} >{hasPlayer ? "Player" : ""}</div>

                <object data={bedImage} type="image/svg+xml"></object>

            </div>
        );
    }
}

export default Bed;
