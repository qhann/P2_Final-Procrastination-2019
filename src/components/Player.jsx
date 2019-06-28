import React, { Component } from "react";

import boy from "./Player/boy.svg";
import boy_tired from "./Player/boy-tired.svg";
import boy_tiredest from "./Player/boy-tiredest.svg";
import girl from "./Player/girl.svg";
import girl_tired from "./Player/girl-tired.svg";
import girl_tiredest from "./Player/girl-tiredest.svg";

import sleepGirl from "./Player/sleepGirl.svg";
import sleepGirl_tired from "./Player/sleepGirl-tired.svg";
import sleepGirl_tiredest from "./Player/sleepGirl-tiredest.svg";
import sleepGirl_2 from "./Player/sleepGirl-2.svg";
import sleepGirl_2_tired from "./Player/sleepGirl-2-tired.svg";
import sleepGirl_2_tiredest from "./Player/sleepGirl-2est-tired.svg";
import sleepBoy from "./Player/sleepBoy.svg";
import sleepBoy_tired from "./Player/sleepBoy-tired.svg";
import sleepBoy_tiredest from "./Player/sleepBoy-tiredest.svg";
import sleepBoy_2 from "./Player/sleepBoy-2.svg";
import sleepBoy_2_tired from "./Player/sleepBoy-2-tired.svg";
import sleepBoy_2_tiredest from "./Player/sleepBoy-2est-tired.svg";

import buildGirl from "./Player/buildGirl.svg";
import buildGirl_tired from "./Player/buildGirl-tired.svg";
import buildGirl_tiredest from "./Player/buildGirl-tiredest.svg";
import buildGirl_2 from "./Player/buildGirl-2.svg";
import buildGirl_2_tired from "./Player/buildGirl-2-tired.svg";
import buildGirl_2_tiredest from "./Player/buildGirl-2est-tired.svg";
import buildBoy from "./Player/buildBoy.svg";
import buildBoy_tired from "./Player/buildBoy-tired.svg";
import buildBoy_tiredest from "./Player/buildBoy-tiredest.svg";
import buildBoy_2 from "./Player/buildBoy-2.svg";
import buildBoy_2_tired from "./Player/buildBoy-2-tired.svg";
import buildBoy_2_tiredest from "./Player/buildBoy-2est-tired.svg";

import coffeeGirl from "./Player/coffeeGirl.svg";
import coffeeGirl_tired from "./Player/coffeeGirl-tired.svg";
import coffeeGirl_tiredest from "./Player/coffeeGirl-tiredest.svg";
import coffeeGirl_2 from "./Player/coffeeGirl.svg";
import coffeeGirl_2_tired from "./Player/coffeeGirl-tired.svg";
import coffeeGirl_2_tiredest from "./Player/coffeeGirl-tiredest.svg";
import coffeeBoy from "./Player/coffeeBoy.svg";
import coffeeBoy_tired from "./Player/coffeeBoy-tired.svg";
import coffeeBoy_tiredest from "./Player/coffeeBoy-tiredest.svg";
import coffeeBoy_2 from "./Player/coffeeBoy-2.svg";
import coffeeBoy_2_tired from "./Player/coffeeBoy-tired.svg";
import coffeeBoy_2_tiredest from "./Player/coffeeBoy-tiredest.svg";

import feedGirl from "./Player/feedGirl.svg";
import feedGirl_tired from "./Player/feedGirl-tired.svg";
import feedGirl_tiredest from "./Player/feedGirl-tiredest.svg";
import feedBoy from "./Player/feedBoy.svg";
import feedBoy_tired from "./Player/feedBoy-tired.svg";
import feedBoy_tiredest from "./Player/feedBoy-tiredest.svg";

import petGirl from "./Player/petGirl.svg";
import petGirl_tired from "./Player/petGirl-tired.svg";
import petGirl_tiredest from "./Player/petGirl-tiredest.svg";
import petBoy from "./Player/petBoy.svg";
import petBoy_tired from "./Player/petBoy-tired.svg";
import petBoy_tiredest from "./Player/petBoy-tiredest.svg";

import playGirl from "./Player/playGirl.svg";
import playGirl_tired from "./Player/playGirl-tired.svg";
import playGirl_tiredest from "./Player/playGirl-tiredest.svg";
import playBoy from "./Player/playBoy.svg";
import playBoy_tired from "./Player/playBoy-tired.svg";
import playBoy_tiredest from "./Player/playBoy-tiredest.svg";

class Player extends Component {
  render() {
    const { action, gender, tiredness, frameDuration, time } = this.props;

    let playerImage = {
        girl: {
            none: {
                rested: girl,
                tired: girl_tired,
                tiredest: girl_tiredest
            },
            sleep: {
                rested: [sleepGirl, sleepGirl_2],
                tired: [sleepGirl_tired, sleepGirl_2_tired],
                tiredest: [sleepGirl_tiredest, sleepGirl_2_tiredest]
            },
            build: {
                rested: [buildGirl, buildGirl_2],
                tired: [buildGirl_tired, buildGirl_2_tired],
                tiredest: [buildGirl_tiredest, buildGirl_2_tiredest]
            },
            coffee: {
                rested: [coffeeGirl, coffeeGirl_2],
                tired: [coffeeGirl_tired, coffeeGirl_2_tired],
                tiredest: [coffeeGirl_tiredest, coffeeGirl_2_tiredest]
            },
            feed: {
                rested: feedGirl,
                tired: feedGirl_tired,
                tiredest: feedGirl_tiredest
            },
            pet: {
                rested: petGirl,
                tired: petGirl_tired,
                tiredest: petGirl_tiredest
            },
            play: {
                rested: playGirl,
                tired: playGirl_tired,
                tiredest: playGirl_tiredest
            },
        },
        boy: {
            none: {
                rested: boy,
                tired: boy_tired,
                tiredest: boy_tiredest
            },
            sleep: {
                rested: [sleepBoy, sleepBoy_2],
                tired: [sleepBoy_tired, sleepBoy_2_tired],
                tiredest: [sleepBoy_tiredest, sleepBoy_2_tiredest]
            },
            build: {
                rested: [buildBoy, buildBoy_2],
                tired: [buildBoy_tired, buildBoy_2_tired],
                tiredest: [buildBoy_tiredest, buildBoy_2_tiredest]
            },
            coffee: {
                rested: [coffeeBoy, coffeeBoy_2],
                tired: [coffeeBoy_tired, coffeeBoy_2_tired],
                tiredest: [coffeeBoy_tiredest, coffeeBoy_2_tiredest]
            },
            feed: {
                rested: feedBoy,
                tired: feedBoy_tired,
                tiredest: feedBoy_tiredest
            },
            pet: {
                rested: petBoy,
                tired: petBoy_tired,
                tiredest: petBoy_tiredest
            },
            play: {
                rested: playBoy,
                tired: playBoy_tired,
                tiredest: playBoy_tiredest
            },
        }
    }

    let useImage = playerImage[gender][action][tiredness]

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
