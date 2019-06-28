import React, { Component } from "react";
import DeskSvg from "./SVGs/DeskSvg.jsx";
import Artwork from "./Artwork";
import builtboy from "./Player/builtboy.svg"
import builtboy2 from "./Player/builtboy2.svg"

class Desk extends Component {
    render() {
        const { onClick, hasPlayer, time } = this.props;

        return (
            // <div className={"desk"}>
            //     <div className={"player"} >{hasPlayer ? "." : ""}</div>
            <div className={"desk"}>
                {hasPlayer ?
                    <img
                        src={time % 1000  > 9 ? builtboy: builtboy2 }
                        className={"desk-guy"}
                    />
                    : null}
                {/* <object data={deskImage} type="image/svg+xml"></object> */}
                {/* <svg width="100%" height="100%">
                    <use xlinkHref={deskImage + "#desk"} id="robot-1" />
                </svg> */}
                <DeskSvg onClick={onClick} />
                <Artwork
                    onClick={onClick}
                    working={hasPlayer}
                />
            </div>
        );
    }
}

export default Desk;
