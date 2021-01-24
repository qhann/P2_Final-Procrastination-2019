import React, { Component } from "react";
import Mentor from "./SVGs/mentor.svg";
import roomImage from "./roomwide.png";
import Moonlight from "./Moonlight";
import roomMask from "./Masks/room-mask.png";
import Player from "./Player"


class Room extends Component {
    render() {
        const { time, hasPlayer, player } = this.props;
        return (
            <>
                {hasPlayer ?
                    <Player time={time} frameDuration={6} gender={player.gender} action={player.action} tiredness={player.tiredness} location={"room"} />
                    : null}
                <Moonlight time={time} selector={"room"} mask={roomMask} />
                <img src={roomImage} className="room" alt="room" />
            </>
        );
    }
}

export default Room;
