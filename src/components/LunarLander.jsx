import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import lunarLanderSketch from "./LunarLander/LunarLander.js";

class LunarLander extends Component {

    render() {
        const {onClick} = this.props        
        return (
            <div className={"artwork"} onClick={onClick}>
                <P5Wrapper sketch={lunarLanderSketch} />
            </div>
        );
    }
}

export default LunarLander;
