import React, { Component } from "react";

class DropDown extends Component {

  runWithoutPropagation(e, func) {
    e.stopPropagation()
    func()
  }

  render() {
    const { options } = this.props;

    let buttons = options.map(option => {
      return <button onClick={e => this.runWithoutPropagation(e, option.action)} className={"button-drop-down"} key={option.action}>{option.caption}</button>;
    });

    return (
      <div className={"drop-down"}>
        {buttons}
      </div>
    );
  }
}

export default DropDown;

