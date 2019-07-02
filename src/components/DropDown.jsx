import React, { Component } from "react";

class DropDown extends Component {
  render() {
    const { isVisible, options } = this.props;

    let hidden = { display: "none" };
    let styles = isVisible ? {} : hidden;

    let buttons = options.map(option => {
      return <button onClick={option.action} className={"button-drop-down"} key={option.action}>{option.caption}</button>;
    });

    return (
      <div className={"drop-down"} style={styles}>
        {buttons}
      </div>
    );
  }
}

export default DropDown;

