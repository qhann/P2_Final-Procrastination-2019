import React, { Component } from "react";
import BedSvg from "./SVGs/BedSvg"
import BedLowerSvg from "./SVGs/BedLowerSvg";
import Moonlight from "./Moonlight";
import bedSideMask from "./bed-mask-side-bw.png"
import bedTopMask from "./bed-mask-top-bw.png"
import sleepgirl1 from "./sleepgirl1.svg"
import sleepgirl2 from "./sleepgirl2.svg"


class Bed extends Component {
    render() {
        const { onClick, hasPlayer, time } = this.props;


        return (
            <div className={"bed"}>
                {hasPlayer ?
                    <img
                        src={time % 10 > 5 ? sleepgirl1 : sleepgirl2}
                        className={"bed-girl"}
                    />
                    : null}
                <Moonlight time={time} mask={bedTopMask} selector={"bed-top"} />
                <Moonlight time={time} mask={bedSideMask} selector={"bed-side"} vertical={true} />
                <Moonlight time={time} mask={bedSideMask} selector={"bed-side"} vertical={true} />
                <BedSvg onClick={onClick} />
                {/* <BedLowerSvg onClick={onClick} /> */}

            </div>
        );
    }
}

export default Bed;
