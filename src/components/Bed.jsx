import React, { Component } from "react";
import BedSvg from "./BedSvg"

class Bed extends Component {
    render() {
        const { onClick, hasPlayer } = this.props;


        return (
            <div className={"bed"}>
                <div className={"player"} >{hasPlayer ? "Player" : ""}</div>
                <BedSvg onClick={onClick}/>
            </div>
        );
    }
}

export default Bed;
