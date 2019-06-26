import React, { Component } from "react";
import BedSvg from "./SVGs/BedSvg"
import BedLowerSvg from "./SVGs/BedLowerSvg";
import Moonlight from "./Moonlight";
import betSideMask from "./bed-mask-side-bw.png"
import betTopMask from "./bed-mask-top-bw.png"


class Bed extends Component {
    render() {
        const { onClick, hasPlayer, time } = this.props;


        return (
            <div className={"bed"}>
                <div className={"player"} >{hasPlayer ? "Player" : ""}</div>
                <Moonlight time={time} mask={betTopMask} selector={"bed-top"} />
                <Moonlight time={time} mask={betSideMask} selector={"bed-side"} vertical={true} />
                <BedSvg onClick={onClick} />
                {/* <BedLowerSvg onClick={onClick} /> */}
            </div>
        );
    }
}

export default Bed;
