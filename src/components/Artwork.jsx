import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import artworkSketch from "./artwork-sketch.js";

class Artwork extends Component {

    render() {
        const {working, onClick, vitalStats} = this.props        
        return (
            <div className={"artwork"} onClick={onClick}>
                <P5Wrapper playing={working} sketch={artworkSketch} speedFactor={100} vitalStats={vitalStats} />
            </div>
        );
    }
}

export default Artwork;
