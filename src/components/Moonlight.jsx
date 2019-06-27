import React, { Component } from "react";

class Moonlight extends Component {


  render() {
    const { time, mask, selector, selector2, vertical, color} = this.props
    let percentDay = ((time / 60) % 12) / 12 * 1
    let horizontalSkew = !vertical ? 90 -percentDay * 180 : 0
    let verticalSkew = vertical ? 180 + percentDay * 180 : 0
    let moonStyles = {
      transform: `skew(${horizontalSkew}deg, ${verticalSkew}deg)`,
      background: color ? color : "white"  
    }

    return (
      <div className={"pattern pattern-" + selector} style={{maskImage: `url(${mask})`}}>
        <div className={"moonlight moonlight-" + selector + (vertical ? " vertical" : "")} style={moonStyles} />
      </div>
    );
  }
}

export default Moonlight;
