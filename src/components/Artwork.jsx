import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import artworkSketch from "./artwork-sketch.js";

class Artwork extends Component {

    render() {
        const {working, onClick} = this.props        
        return (
            <div className={"artwork"} onClick={onClick}>
                <P5Wrapper playing={working} sketch={artworkSketch} />
            </div>
        );
    }
}

export default Artwork;
