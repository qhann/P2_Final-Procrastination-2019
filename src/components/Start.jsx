import React, { Component } from "react";
import Cat from "./Cat";
import update from "immutability-helper";



class Start extends Component {

  state = {
    cat: {
      hasPlayer: false,
      position: {
        x: 400,
        y: 800
      },
      moving: false,
      menuOpen: false,
      interaction: "none",
      direction: "left",
    }
  }

  getGlobalInterval(time) {
    let globalInterval = setInterval(
      () => this.updateTimed(),
      500
    );
    return globalInterval
  }

  componentDidMount() {
    let globalInterval = this.getGlobalInterval(500)

    this.setState(prevState =>
      update(prevState, {
        cat: {
          position: {
            x: { $set: 300 },
            y: { $set: 1080 /*window.innerHeight*/ * 0.8 }
          }
        },
        globalInterval: { $set: globalInterval }
      })
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.globalInterval);
  }

  updateTimed() {
    let time = this.state.time

    this.setState(prevState => {
      let newCat =
        time.toFixed(1) % 10 == 0
          ? this.moveCat(prevState.cat)
          : prevState.cat;
      return update(prevState, {
        cat: { $set: newCat },
      });
    });
  }

  moveCat(prevCat) {
    let newCat, newPosition, dx, dy, distance, direction;
    if (this.state.cat.menuOpen || this.state.cat.hasPlayer) return prevCat;

    newPosition = {
      x: ~~(150 + 1520 * Math.random()),
      y: ~~(700 + 120 * Math.random())
    };

    dx = prevCat.position.x - newPosition.x;
    dy = prevCat.position.y - newPosition.y;
    distance = Math.sqrt(dx * dx + dy * dy);
    direction = dx > 0 ? "left" : "right";

    newCat = update(prevCat, {
      position: {
        x: { $set: newPosition.x },
        y: { $set: newPosition.y }
      },
      transition: { $set: `transform ${distance / 300}s linear` },
      moving: { $set: true },
      direction: { $set: direction }
    });

    // console.log(~~(distance / 400 * 1000));

    setTimeout(
      () =>
        this.setState(prevState =>
          update(prevState, {
            cat: {
              moving: { $set: false }
            }
          })
        ),
      ~~((distance / 300) * 1000)
    );

    return newCat;
  }

  render() {
    const { nextScreen } = this.props;
    let cat = this.state.cat
    let player = {}
    return (
      <>
        <div className={"start"}>
          <p> FINAL PROCRASTINATION </p>
          <button className={"start-button"} onClick={nextScreen}>
            neues Spiel
        </button>
        </div>
        <Cat
          hasPlayer={cat.hasPlayer}
          menuOpen={cat.menuOpen}
          player={player}
          onClick={(e) => this.handleCatClick(e)}
          catInteraction={action => this.handleCatInteraction(action)}
          position={cat.position}
          transitionSpeed={cat.transition}
          time={time}
          moving={cat.moving}
          direction={cat.direction}
        />
      </>
    );
  }
}

export default Start;
