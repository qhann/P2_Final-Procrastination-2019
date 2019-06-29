import React, { Component } from "react";
import BedSvg from "./SVGs/BedSvg";
import Moonlight from "./Moonlight";
import bedSideMask from "./Masks/bed-mask-side-bw.png";
import bedTopMask from "./Masks/bed-mask-top-bw.png";
import Player from "./Player"

class Bed extends Component {
  render() {
    const { onClick, hasPlayer, time, player } = this.props;
    let sleepSlower = 20

    return (
      <div className={"bed"}>
        {hasPlayer ? (
            <Player time={time} gender={player.gender} action={player.action} tiredness={player.tiredness} />
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
      </div>
    );
  }
}

export default Bed;
