import React, { Component } from "react";
import DeskSvg from "./SVGs/DeskSvg.jsx";
import Artwork from "./Artwork";
import builtboy from "./Player/builtboy.svg"


class Desk extends Component {
    render() {
        const { onClick, hasPlayer } = this.props;


        return (
            // <div className={"desk"}>
            //     <div className={"player"} >{hasPlayer ? "." : ""}</div>
            <div className={"desk"}>
                {hasPlayer ?
                    <img
                        src={builtboy}
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
