import React, { Component } from "react";
import Mentor from "./SVGs/mentor.svg";
import roomImage from "./roomwide.png";
import Moonlight from "./Moonlight";
import roomMask from "./Masks/room-mask.png";


class Room extends Component {
    render() {
        const { time, player } = this.props;
        return (
            <div>
                <Moonlight time={time} selector={"room"} mask={roomMask} />
                <img src={roomImage} className="room" alt="room" />
            </div>
        );
    }
}

export default Room;
