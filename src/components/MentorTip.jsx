import React, { Component } from "react";
import mentorImage from "./SVGs/mentor.svg";

class MentorTip extends Component {


  render() {
    const { text } = this.props

    return (
      <div className={"mentor-tip"}>
        <img src={mentorImage} alt={"mentor"} />
        <p>
          {text}
        </p>
      </div>
    );
  }
}

export default MentorTip;
