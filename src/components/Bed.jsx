import React, { Component } from "react";
import bedImage from "./bed1.svg"

class Bed extends Component {

    componentDidMount() {
        document.getElementById("coffee").contentDocument.getElementById('bed-path').addEventListener("click", this.props.onClick)
    }

    render() {
        const { onClick, hasPlayer } = this.props;


        return (
            <div className={"bed"} onClick={onClick}>
                <div className={"player"} >{hasPlayer ? "Player" : ""}</div>
                {/* <object data={bedImage} type="image/svg+xml"></object> */}
                <svg id={"bed-svg"} width="100%" height="100%">
                    <use xlinkHref={bedImage + "#bed"}/>
                </svg>
            </div>
        );
    }
}

export default Bed;
