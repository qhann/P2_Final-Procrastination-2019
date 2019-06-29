import React, { Component } from "react";
import CoffeeSvg from "./SVGs/CoffeeSvg";


class CoffeeMaker extends Component {
    render() {
        const { onClick, hasPlayer, gender } = this.props;

        return (
            <div className={"coffee-maker"}>
                {/* {hasPlayer ?
                    <img src={gender == "male" ? coffeeBoy : coffeeGirl} className={"coffee-guy"} />
                    : null
                } */}
                <CoffeeSvg onClick={onClick} />
            </div>
        );
    }
}

export default CoffeeMaker;
