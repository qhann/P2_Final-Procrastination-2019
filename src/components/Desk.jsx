import React, { Component } from "react";
import DeskSvg from "./SVGs/DeskSvg.jsx";
import Artwork from "./Artwork";

class Desk extends Component {
    render() {
        const { onClick, hasPlayer, time } = this.props;

        return (
            <div className={"desk"}>
                {/* {hasPlayer ?
                    <img
                        src={time % 1000  > 9 ? builtboy: builtboy2 }
                        className={"desk-guy"}
                    />
                    : null} */}
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
