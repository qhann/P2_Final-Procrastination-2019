import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import lunarLanderSketch from "./LunarLander/LunarLander.js";

class LunarLander extends Component {

    render() {
        const {onClick, getScore} = this.props        
        return (
            <div className={"lunar-lander"} onClick={onClick}>
                <P5Wrapper sketch={lunarLanderSketch} getScore={getScore}/>
            </div>
        );
    }
}

export default LunarLander;
