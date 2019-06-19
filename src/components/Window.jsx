import React, { Component } from "react";

class Window extends Component {


  render() {
    const {time} = this.props
    let percentDay = ((time / 60) % 12) / 12 * 0.5
    let styles = {
        opacity: percentDay
    }
    return (
      <div className={"window"} style={styles}>
         
      </div>
    );
  }
}

export default Window;
