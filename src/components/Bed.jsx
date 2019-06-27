import React, { Component } from "react";
import BedSvg from "./SVGs/BedSvg";
import BedLowerSvg from "./SVGs/BedLowerSvg";
import Moonlight from "./Moonlight";
import bedSideMask from "./Masks/bed-mask-side-bw.png";
import bedTopMask from "./Masks/bed-mask-top-bw.png";
import sleepgirl1 from "./Player/sleepgirl1.svg";
import sleepgirl2 from "./Player/sleepgirl2.svg";

class Bed extends Component {
  render() {
    const { onClick, hasPlayer, time } = this.props;

    return (
      <div className={"bed"}>
        {hasPlayer ? (
          <img
            src={time % 16 > 9 ? sleepgirl1 : sleepgirl2}
            className={"bed-girl"}
          />
        ) : null}
        <Moonlight time={time} mask={bedTopMask} selector={"bed-top"} />
        <Moonlight
          time={time}
          mask={bedSideMask}
          selector={"bed-side"}
          vertical={true}
        />
        <Moonlight
          time={time}
          mask={bedSideMask}
          selector={"bed-side"}
          vertical={true}
        />
        <BedSvg onClick={onClick} />
        {/* <BedLowerSvg onClick={onClick} /> */}
      </div>
    );
  }
}

export default Bed;
