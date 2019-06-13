import React, { Component } from "react";

class DropDown extends Component {
  render() {
    // var visible = this.props.visible; var options...
    // DAS GLEICHE WIE
    const { visible, options } = this.props;

    let hidden = { display: "none" };

    // let styles;
    // if (this.props.visible == true) {
    //   styles = {}
    // } else {
    //   styles = hidden;
    // }
    //
    // DAS GLEICHE IN KURZFORM (ternary operator)
    let styles = visible ? {} : hidden;

    // Für jedes Element im options-array erstelle ein button-element. 'caption' ist einer der strings, zB "füttern"
    let buttons = options.map(option => {
      return <button onClick={option.action}>{option.caption}</button>;
    });

    return (
      <div className={"drop-down"} style={styles}>
        {buttons}
      </div>
    );
  }
}

export default DropDown;

let test = 3 > 5 ? "great" : "terrible";
console.log(test);
