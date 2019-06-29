import React, { Component } from "react";
import DeskSvg from "./SVGs/DeskSvg.jsx";
import Artwork from "./Artwork";
import Player from "./Player"

class Desk extends Component {
    render() {
        const { onClick, hasPlayer, time, player } = this.props;

        return (
            <div className={"desk"}>
                {hasPlayer ? (
                    <Player time={time} gender={player.gender} action={player.action} tiredness={player.tiredness} />
                ) : null}
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
