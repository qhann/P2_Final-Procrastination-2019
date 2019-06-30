import React, { Component } from "react";
import DeskSvg from "./SVGs/DeskSvg.jsx";
import Artwork from "./Artwork";
import Player from "./Player";
import lamplight from "./SVGs/lamplight.svg"

class Desk extends Component {
    render() {
        const { onClick, hasPlayer, time, player, vitalStats } = this.props;
        // console.log(~~vitalStats.exhaustion);
        
        return (
            <div className={"desk"}>
                {hasPlayer ? (
                    <Player time={time} frameDuration={4} gender={player.gender} action={player.action} tiredness={player.tiredness} />
                ) : null}
                <DeskSvg onClick={onClick} />
                <img className={lamplight} src={lamplight}/>
                <Artwork
                    onClick={onClick}
                    working={hasPlayer}
                    vitalStats={vitalStats}
                />
            </div>
        );
    }
}

export default Desk;
