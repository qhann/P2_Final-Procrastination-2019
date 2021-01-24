import React, { Component } from "react";

class StatusBar extends Component {
  render() {
    const { value, label, selector, coffee } = this.props;
    let width = 1920 * 0.112
    let height = 1080 * 0.026

    let displayedValue = value * ((100)/100) - coffee

    let styles = {
      // width: width + "px",
      // height: height + "px",
      backgroundPositionX: (width / 100) * ( displayedValue) + "px",
      backgroundImage: `linear-gradient(to right, #222 0%, #222 ${coffee/2}%, #000 ${coffee/2}%, #000 100%)`

    }
    let greyedStyles = {}

    return (
      <div className={"status-bar-frame " + selector} style={{background: "white"}}>
        <div className={"status-bar"} style={styles}>
          <p className={"status-label"} style={{  }}>{label}</p>
        </div>
      </div>
    );
  }
}

StatusBar.defaultProps = {
  coffee: 0
}

export default StatusBar;
