import React, { Component } from "react";

import boy from "./Player/boy.svg";
import boy_tired from "./Player/boy-tired.svg";
import girl from "./Player/girl.svg";
import girl_tired from "./Player/girl-tired.svg";

import sleepGirl from "./Player/sleepGirl.svg";
import sleepGirl_tired from "./Player/sleepGirl-tired.svg";
import sleepGirl_2 from "./Player/sleepGirl-2.svg";
import sleepGirl_2_tired from "./Player/sleepGirl-2-tired.svg";
import sleepBoy from "./Player/sleepBoy.svg";
import sleepBoy_tired from "./Player/sleepBoy-tired.svg";
import sleepBoy_2 from "./Player/sleepBoy-2.svg";
import sleepBoy_2_tired from "./Player/sleepBoy-2-tired.svg";

import buildGirl from "./Player/buildGirl.svg";
import buildGirl_tired from "./Player/buildGirl-tired.svg";
import buildGirl_2 from "./Player/buildGirl-2.svg";
import buildGirl_2_tired from "./Player/buildGirl-2-tired.svg";
import buildBoy from "./Player/buildBoy.svg";
import buildBoy_tired from "./Player/buildBoy-tired.svg";
import buildBoy_2 from "./Player/buildBoy-2.svg";
import buildBoy_2_tired from "./Player/buildBoy-2-tired.svg";

import coffeeGirl from "./Player/coffeeGirl.svg";
import coffeeGirl_tired from "./Player/coffeeGirl-tired.svg";
import coffeeGirl_2 from "./Player/coffeeGirl.svg";
import coffeeGirl_2_tired from "./Player/coffeeGirl-tired.svg";
import coffeeBoy from "./Player/coffeeBoy.svg";
import coffeeBoy_tired from "./Player/coffeeBoy-tired.svg";
import coffeeBoy_2 from "./Player/coffeeBoy-2.svg";
import coffeeBoy_2_tired from "./Player/coffeeBoy-tired.svg";

import feedGirl from "./Player/feedGirl.svg";
import feedGirl_tired from "./Player/feedGirl-tired.svg";
import feedBoy from "./Player/feedBoy.svg";
import feedBoy_tired from "./Player/feedBoy-tired.svg";

import petGirl from "./Player/petGirl.svg";
import petGirl_tired from "./Player/petGirl-tired.svg";
import petBoy from "./Player/petBoy.svg";
import petBoy_tired from "./Player/petBoy-tired.svg";

import playGirl from "./Player/playGirl.svg";
import playGirl_tired from "./Player/playGirl-tired.svg";
import playBoy from "./Player/playBoy.svg";
import playBoy_tired from "./Player/playBoy-tired.svg";

class Player extends Component {
  render() {
    const { action, gender, tired, frameDuration, time } = this.props;

    let playerImage = {
        girl: {
            normal: {
                rested: girl,
                tired: girl_tired
            },
            sleep: {
                rested: [sleepGirl, sleepGirl_2],
                tired: [sleepGirl_tired, sleepGirl_2_tired]
            },
            build: {
                rested: [buildGirl, buildGirl_2],
                tired: [buildGirl_tired, buildGirl_2_tired]
            },
            coffee: {
                rested: [coffeeGirl, coffeeGirl_2],
                tired: [coffeeGirl_tired, coffeeGirl_2_tired]
            },
            feed: {
                rested: feedGirl,
                tired: feedGirl_tired
            },
            pet: {
                rested: petGirl,
                tired: petGirl_tired
            },
            play: {
                rested: playGirl,
                tired: playGirl_tired
            },
        },
        boy: {
            normal: {
                rested: boy,
                tired: boy_tired
            },
            sleep: {
                rested: [sleepBoy, sleepBoy_2],
                tired: [sleepBoy_tired, sleepBoy_2_tired]
            },
            build: {
                rested: [buildBoy, buildBoy_2],
                tired: [buildBoy_tired, buildBoy_2_tired]
            },
            coffee: {
                rested: [coffeeBoy, coffeeBoy_2],
                tired: [coffeeBoy_tired, coffeeBoy_2_tired]
            },
            feed: {
                rested: feedBoy,
                tired: feedBoy_tired
            },
            pet: {
                rested: petBoy,
                tired: petBoy_tired
            },
            play: {
                rested: playBoy,
                tired: playBoy_tired
            },
        }
    }

    let useImage = playerImage[gender][action][tired]

    if (useImage.isArray()) {
        let timer = (time % frameDuration == 0)
        useImage = timer ? useImage[0] : useImage[1]
    }

    return (
      <img src={useImage} alt="player"/>
    );
  }
}

export default Player;
