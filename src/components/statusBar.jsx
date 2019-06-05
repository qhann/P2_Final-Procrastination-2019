import React, { Component } from "react";

class StatusBar extends Component {
  render() {
    const { value, label, onClick } = this.props;
    let width = 200
    let height = 30

    let styles = {
      width: width + "px",
      height: height + "px",
      backgroundPositionX: (width/100) * value + "px"
    }
   
    return (
      <div onClick={onClick} className={"status-bar"} style={styles}>
        <p className={"status-label"} style={{color: "black"}}>{label}</p>
        <p className={"status-label"} style={{color: "white"}}>{label}</p>
      </div>
    );
  }
}

export default StatusBar;
