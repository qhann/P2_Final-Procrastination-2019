import React, { Component } from "react";
import CoffeeSvg from "./SVGs/CoffeeSvg";
import Player from "./Player"


class CoffeeMaker extends Component {
    render() {
        const { onClick, hasPlayer, gender, player, time } = this.props;

        return (
            <div className={"coffee-maker"}>
                {hasPlayer ? (
                    <Player time={time} gender={player.gender} action={player.action} tiredness={player.tiredness} />
                ) : null}
                <CoffeeSvg onClick={onClick} />
            </div>
        );
    }
}

export default CoffeeMaker;
