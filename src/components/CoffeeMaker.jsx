import React, { Component } from "react";
import CoffeeSvg from "./SVGs/CoffeeSvg";
import builtboy from "./builtboy.svg";

class CoffeeMaker extends Component {
  render() {
    const { onClick, hasPlayer } = this.props;

    return (
      <div className={"coffee-maker"}>
        {hasPlayer ? <img src={builtboy} className={"coffee-guy"} /> : null}
        <CoffeeSvg onClick={onClick} />
      </div>
    );
  }
}

export default CoffeeMaker;

// import React, { Component } from "react";
// import CoffeeSvg from "./SVGs/CoffeeSvg";

// class CoffeeMaker extends Component {
//   render() {
//     const { onClick, hasPlayer } = this.props;

//     return (
//       <div className={"coffee-maker"}>
//         <div className={"player"}>{hasPlayer ? "Player" : ""}</div>

//         <CoffeeSvg onClick={onClick} />
//       </div>
//     );
//   }
// }

// export default CoffeeMaker;
