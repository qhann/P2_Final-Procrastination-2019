import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import artworkSketch from "./artwork-sketch.js";

class Artwork extends Component {

    render() {
        
        return (
            <P5Wrapper sketch={artworkSketch} />
        );
    }
}

export default Artwork;
