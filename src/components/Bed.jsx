import React, { Component } from "react";
import BedSvg from "./SVGs/BedSvg";
import Moonlight from "./Moonlight";
import bedSideMask from "./Masks/bed-mask-side-bw.png";
import bedTopMask from "./Masks/bed-mask-top-bw.png";
import Player from "./Player"
import DropDown from "./DropDown";


class Bed extends Component {

  getDropDownOptions() {
    return [
      {
        caption: "Nickerchen",
        action: () => {
          this.props.nap()
        }
      },
      {
        caption: "Schlafen",
        action: () => {
          this.props.sleep();
        }
      },
    ];
  }

  render() {
    const { onClick, hasPlayer, menuOpen, time, player } = this.props;

    return (
      <div className={"bed"}>
        {hasPlayer ?
          <Player time={time} frameDuration={6} gender={player.gender} action={player.action} tiredness={player.tiredness} />
          : null}
        {menuOpen ?
          <DropDown options={this.getDropDownOptions()} />
          : null}
        <Moonlight time={time} mask={bedTopMask} selector={"bed-top"} />
        <Moonlight
          time={time}
          mask={bedSideMask}
          selector={"bed-side"}
          vertical={true}
        />
        <BedSvg onClick={e => onClick(e)} />
      </div>
    );
  }
}

export default Bed;
