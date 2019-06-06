import React, { Component } from "react";

class MentorTip extends Component {


  render() {
    const {text} = this.props
    
    return (
      <div className={"mentor-tip"}>
          <p>
            {text}
          </p>
      </div>
    );
  }
}

export default MentorTip;
