import React, { Component } from "react";
import deskImage from "./desk.svg";

class Desk extends Component {
    render() {
        const { onClick, hasPlayer } = this.props;


        return (
            <div className={"desk"} onClick={onClick}>
                <div className={"player"} >{hasPlayer ? "Player" : ""}</div>
                {/* <object data={deskImage} type="image/svg+xml"></object> */}
                <svg width="100%" height="100%">
                    <use xlinkHref={deskImage + "#desk"} id="robot-1" />
                </svg>

            </div>
        );
    }
}

export default Desk;
