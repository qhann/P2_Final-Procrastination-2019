import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import snakeSketch from "./snake/snake.js";

class Snake extends Component {

    render() {
        const {onClick, getScore} = this.props        
        return (
            <div className={"snake"} onClick={onClick}>
                <P5Wrapper sketch={snakeSketch} getScore={getScore} />
            </div>
        );
    }
}

export default Snake;
