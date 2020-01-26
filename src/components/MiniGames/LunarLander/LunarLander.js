import p5 from "p5";
import mapImageFile from "./maps/lvl1_bg.jpg";
import rocketImageFile from "./assets/croppet.png";
import jet1 from "./assets/jet.png";
import jet2 from "./assets/jet2.png";

export default function artworkSketch(s) {
  let width = 840; //1920 * 0.5;
  let height = 1080 * 0.5 + 200;
  // console.log(height);

  const buttonUp = {
    x0: width / 2 - 80 ,
    x1: width / 2 - 80  + 40,
    y0: height - 80, 
    y1: height - 80 + 30, 
  }
  
  const buttonDown = {
    x0: height - 20,
    x1: height - 20 + 20,
    y0: width / 2 - 50, 
    y1: width / 2 - 50 + 30, 
  }

  const buttonLeft = {
    x0: width / 2 - 100 ,
    x1: width / 2 - 100  + 40,
    y0: height - 50, 
    y1: height - 50 + 30, 
  }
  const buttonRight = {
    x0: width / 2 - 60 ,
    x1: width / 2 - 60  + 40,
    y0: height - 50, 
    y1: height - 50 + 30, 
  }
  
  
  s.setup = () => {
    s.createCanvas(width, height);
    s.frameRate(40);
  };

  var sendScore
  s.myCustomRedrawAccordingToNewPropsHandler = function(newProps) {
    if (newProps.getScore) {
      sendScore = newProps.getScore;
    }
  };
  
  var mapImage = s.loadImage(mapImageFile);
  var rocketSprite = s.loadImage(rocketImageFile);
  var jetSprite = s.loadImage(jet1);
  var jetSprite2 = s.loadImage(jet2);
  var landline = [
    [0.0, 0.638],
    [0.024, 0.63],
    [0.076, 0.644],
    [0.114, 0.638],
    [0.152, 0.598],
    [0.222, 0.59],
    [0.238, 0.602],
    [0.26, 0.598],
    [0.306, 0.558],
    [0.336, 0.562],
    [0.39, 0.584],
    [0.45, 0.63],
    [0.472, 0.626],
    [0.53, 0.698],
    [0.552, 0.71],
    [0.58, 0.708],
    [0.622, 0.688],
    [0.65, 0.698],
    [0.668, 0.69],
    [0.716, 0.726],
    [0.772, 0.768],
    [0.772, 0.768],
    [0.814, 0.768],
    [0.872, 0.75],
    [0.896, 0.744],
    [0.91, 0.708],
    [0.942, 0.676],
    [0.962, 0.638],
    [0.962, 0.61],
    [0.98, 0.59]
  ];

  class Rocket {
    constructor(level) {
      this.x = 500;
      this.y = 100;
      this.vx = (level / 2) + 0.5;
      this.vy = 0;
      this.angle = 0;
      this.va = (level / 5 ) * 0.015 + 0.01;
      this.height = 150;
      this.width = 150;
      this.fuel = 100;
      this.blasting = false;
      this.speed = function() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      };
      return this;
    }
  }

  var world = {
    height: 1500,
    width: 2000
  };
  var view = {
    height: height - 100,
    width: width - 120,
    x: 0,
    y: 0,
    zoom: 0
  };
  var backgroundX, backgroundY;
  var gravity = 0.07;
  var enginePower = gravity * 3.5;
  var fuelConsumption = 0.5;
  var message = "";
  var gameRunning = false;
  var timeElapsed = 0;
  var timer;
  var maxLandingSpeed = 9;
  var level = 0;
  var totalScore = 0;
  var highScore = [100000, 90000, 70000, 60000, 50000, 40000, 30000, 20000, 10000, 0];
  var highestScore = 0;
  var score, scoreFuel, scoreTime, scoreVelocity;
  var showLevelNumber = false

  let rocket = new Rocket(level);


  function startButton(x, y) {
    x -= 15
    // y -= 10
    var width = 80;
    var height = 50;
    var mouseOverStart =
      s.mouseX > x &&
      s.mouseX < x + width &&
      s.mouseY > y &&
      s.mouseY < y + height;
    let GB = 100
    if (mouseOverStart) GB = 0
    s.fill(255, GB, GB);
    s.rect(x, y, width, height);
    s.fill(0, 0, 0);
    s.textSize(16)
    s.text("start", x + 20, y + 30);
    s.textSize(12)

    
    if (mouseOverStart && s.mouseIsPressed) {
      startNewGame();
    }

    s.fill(255,255,255)
    s.text("level: " + (level + 1), x, y+60)
  }

  function startNewGame() {
    gameRunning = true;
    rocket = new Rocket(level);
    message = "";
    clearInterval(timer);
    timeElapsed = 0;
    timer = setInterval(incrementSeconds, 100);
  }

  function incrementSeconds() {
    timeElapsed += 0.1;
  }

  function miniMap() {
    var x = view.width + 7;
    var y = 110;
    var width = 100;
    var height = 100;
    s.push();
    s.fill(255, 255, 255);
    s.rect(x, y, width, height);

    var miniRocketX = (rocket.x / world.width) * width + x;
    var miniRocketY = (rocket.y / world.height) * height + y;
    s.fill(0, 255, 0);
    s.rect(miniRocketX, miniRocketY, 1, 1);
    s.pop();

    for (let i = 0; i < landline.length; i++) {
      var dot = landline[i];
      var prevDot = i > 0 ? landline[i - 1] : dot;

      s.fill(255, 255, 255);
      s.noStroke();
      var faktor = width;
      var dotX = x + dot[0] * width;
      var dotY = y + dot[1] * height;
      var prevDotX = x + prevDot[0] * width;
      var prevDotY = y + prevDot[1] * height;
      s.stroke(0, 0, 0);
      //s.rect( dotX, dotY, 1,1);
      s.line(prevDotX, prevDotY, dotX, dotY);
      // s.line(prevDot[0], prevDot[1], dot[0], dot[1]);
    }
  }

  function fuelMeter() {
    var bar = "",
      nextSign;
    for (let i = 1; i <= 20; i++) {
      if (i * 5 <= rocket.fuel) {
        nextSign = "|";
      } else if (i * 5 - 2.5 < rocket.fuel) {
        nextSign = "ı";
      } else {
        nextSign = ".";
      }
      //nextSign = (i<rocket.fuel/2.5) ? "|" : ".";
      bar = bar + nextSign; //(nextSign) ? bar + nextSign: bar;
    }
    return bar;
  }

  function displayShipData() {
    var x = view.width + 7;
    var y = 230;
    var width = 100;
    var height = 100;
    s.fill(255, 255, 255);
    s.rect(x, y, width, height);
    s.fill(0, 0, 0);
    s.text(
      "speed: " + parseFloat((10 * rocket.speed()) / 10).toFixed(1) + " m/s",
      x + 2,
      y + 15
    );
    s.text("fuel: " + fuelMeter(), x + 2, y + 35);
    s.text("time: " + parseFloat(timeElapsed).toFixed(1) + "s", x + 2, y + 55);
  }

  function showHighscore() {
    var x = view.width + 7;
    var y = 335;
    var width = 100;
    var height = 200;
    s.push();
    s.fill(255, 255, 255);
    s.rect(x, y, width, height);
    s.fill(0, 0, 0);
    for (let i = 0; i < highScore.length; i++) {
      s.text(highScore[i], x + 10, y + 20 + 15 * i);
    }
    s.pop();
  }

  function controls(oldRocket) {
    var newRocket = oldRocket;
    if (oldRocket.fuel <= 0) {
      rocket.blasting = false;
      return newRocket;
    }

    let buttonUpPressed = (s.mouseIsPressed && s.mouseX > buttonUp.x0 && s.mouseX < buttonUp.x1 && s.mouseY > buttonUp.y0 && s.mouseY < buttonUp.y1)
    let buttonDownPressed = (s.mouseIsPressed && s.mouseX > buttonDown.x0 && s.mouseX < buttonDown.x1 && s.mouseY > buttonDown.y0 && s.mouseY < buttonDown.y1)
    let buttonLeftPressed = (s.mouseIsPressed && s.mouseX > buttonLeft.x0 && s.mouseX < buttonLeft.x1 && s.mouseY > buttonLeft.y0 && s.mouseY < buttonLeft.y1)
    let buttonRightPressed = (s.mouseIsPressed && s.mouseX > buttonRight.x0 && s.mouseX < buttonRight.x1 && s.mouseY > buttonRight.y0 && s.mouseY < buttonRight.y1)

    //Key Up
    if (s.keyIsDown(38) || buttonUpPressed) {
      newRocket.fuel -= fuelConsumption;
      newRocket.vy =
        newRocket.vy - (enginePower * 1 - Math.abs(newRocket.angle / s.PI));
      newRocket.vx =
        newRocket.vx + enginePower * ((newRocket.angle / s.PI) * 1.5);
      newRocket.blasting = true;
    } else {
      newRocket.blasting = false;
    }
    //KEY: Left
    if (s.keyIsDown(37) || buttonLeftPressed) {
      newRocket.va -= 0.001;
    }
    //KEY: Right
    if (s.keyIsDown(39) || buttonRightPressed) {
      newRocket.va += 0.001;
    }
    if (Math.abs(rocket.angle) >= s.PI) {
      rocket.angle = rocket.angle - 2 * rocket.angle;
    }
    return newRocket;
  }

  function rocketMovement(oldRocket) {
    var newRocket = oldRocket;
    newRocket.y += newRocket.vy;
    newRocket.x += newRocket.vx;
    newRocket.vy += gravity;
    newRocket.angle += newRocket.va;

    return newRocket;
  }

  function renderBackground(x, y) {
    view.zoom = 1 - rocket.speed() / 150;
    s.image(
      mapImage,
      x + (world.width - world.width * view.zoom) / 2,
      y + (world.height - world.height * view.zoom) / 2,
      world.width * view.zoom,
      world.height * view.zoom
    );
    s.fill(0, 0, 0);
    s.rect(0, view.height, 1000, 1000);
    s.rect(view.width, 0, 1000, 1000);
  }

  function renderRocket(offsetX, offsetY) {
    s.push();
    s.translate(view.width / 2 + offsetX, view.height / 2 + offsetY);
    s.rotate(rocket.angle);
    s.translate(-rocket.width / 2, -rocket.height / 2);
    s.image(rocketSprite, 0, 0, rocket.height, rocket.width);
    if (rocket.blasting) {
      if (Math.floor(rocket.speed() * 10) % 2 != 0) {
        s.image(jetSprite, 22, 95, 102, 50);
      } else {
        s.image(jetSprite2, 29, 95, 90, 50);
      }
    }
    s.pop();
  }

  function renderGame(rocketX, rocketY) {
    backgroundX = -(rocketX - view.width / 2);
    backgroundY = -(rocketY - view.height / 2);
    //world.height = 1500 * (rocket.speed()+10)/10;
    var offsetX = 0;
    var offsetY = 0;
    var viewHitsBorder = {
      top: rocketY - view.height / 2 < 0,
      right: rocketX - view.width / 2 + view.width > world.width,
      bottom: rocketY - view.height / 2 + view.height > world.height,
      left: rocketX - view.width / 2 < 0
    };
    //hits bottom
    if (viewHitsBorder.bottom) {
      backgroundY = -(world.height - view.height);
      offsetY = rocketY - view.height / 2 + backgroundY;
    }
    //hits left
    if (viewHitsBorder.left) {
      backgroundX = 0;
      offsetX = rocketX - view.width / 2 + backgroundX;
    }
    // hits right
    if (viewHitsBorder.right) {
      backgroundX = -(world.width - view.width);
      offsetX = rocketX - view.width / 2 + backgroundX;
    }
    //hits top
    if (viewHitsBorder.top) {
      backgroundY = 0;
      offsetY = rocketY - view.height / 2;
    }

    renderBackground(backgroundX, backgroundY);
    renderRocket(offsetX, offsetY);
  }

  function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) + sin * (y - cy) + cx,
      ny = cos * (y - cy) - sin * (x - cx) + cy;
    return { x: nx, y: ny };
  }

  function hasGroundContact() {
    var curDotL = [],
      prevDotL = [],
      curDotR = [],
      prevDotR = [];
    var RocketLeftMapX = (rocket.x - rocket.width / 3) / world.width;
    var RocketRightMapX = (rocket.x + rocket.width / 3) / world.width;
    var RocketMapY = (rocket.y + rocket.height / 2 - 20) / world.height;
    // s.rect(
    //   backgroundX + RocketLeftMapX * world.width,
    //   backgroundY + RocketMapY * world.height,
    //   2,
    //   2
    // );
    // s.rect(
    //   backgroundX + RocketRightMapX * world.width,
    //   backgroundY + RocketMapY * world.height,
    //   2,
    //   2
    // );
    for (let i = 0; i < landline.length; i++) {
      var curDot = landline[i],
        prevDot = landline[i - 1];
      if (RocketLeftMapX < curDot[0] && RocketLeftMapX > prevDot[0] && curDot) {
        curDotL = landline[i];
        prevDotL = landline[i - 1];
      }
      if (
        RocketRightMapX < curDot[0] &&
        RocketRightMapX > prevDot[0] &&
        !curDot.r
      ) {
        curDotR = curDot;
        prevDotR = prevDot;
      }
    }
    // console.log(curDotR[0]);

    var percentOfSectionXL =
      (RocketLeftMapX - prevDotL[0]) / (curDotL[0] - prevDotL[0]);
    var percentOfSectionXR =
      (RocketRightMapX - prevDotR[0]) / (curDotR[0] - prevDotR[0]);
    var yOfPointL =
      percentOfSectionXL * curDotL[1] + (1 - percentOfSectionXL) * prevDotL[1];
    var yOfPointR =
      percentOfSectionXR * curDotR[1] + (1 - percentOfSectionXR) * prevDotR[1];

    //s.rect(backgroundX + curDot[0]*world.width, backgroundY + curDot[1]*world.height, 2, 2);
    if (RocketMapY >= yOfPointR || RocketMapY >= yOfPointL) {
      // console.log(yOfPointR + " " + yOfPointR);
      return true;
    }
    return false;
  }

  function checkCollision() {
    var rocketHitsBorder = {
      left: rocket.x - rocket.width / 2 < 0,
      right: rocket.x + rocket.width / 2 > world.width,
      top: rocket.y - rocket.height / 2 < 0,
      bottom: hasGroundContact()
      //bottom: rocket.y + rocket.height / 2 > world.height
    };
    if (rocketHitsBorder.left) {
      rocket.vx = 0;
      rocket.x = rocket.width / 2;
    }
    if (rocketHitsBorder.right) {
      rocket.x = world.width - rocket.width / 2;
      rocket.vx = 0;
    }
    if (rocketHitsBorder.top) {
      rocket.vy = 0;
      rocket.y = rocket.height / 2;
    }
    if (rocketHitsBorder.bottom) {
      endOfGame();
    }
  }

  function endOfGame() {
    var playerWins = true;
    if (gameRunning) {
      var speed = rocket.speed();
      if (speed > maxLandingSpeed) {
        message = "You crashed...";
        playerWins = false;
      } else if (speed < maxLandingSpeed * 0.25) {
        message = "Like a feather";
      } else if (speed < maxLandingSpeed * 0.6) {
        message = "Good Landing!";
      } else if (speed < maxLandingSpeed * 0.9) {
        message = "Your ship survived.";
      } else if (speed <= maxLandingSpeed) {
        message = "...";
      }
    }

    gameRunning = false;
    rocket.blasting = false;
    clearInterval(timer);

    startButton(view.width + 7, 10);
    if (playerWins) {
      scoreVelocity = (1 / rocket.speed()) * 50;
      scoreFuel = 1000 / (100.1 - rocket.fuel) - 10;
      scoreTime = (1 / timeElapsed) * 120;
      score = Math.floor(500 * (scoreVelocity + scoreFuel + scoreTime));
      console.log(
        " v: " + scoreVelocity + " t: " + scoreTime + " f: " + scoreFuel
      );
      totalScore += score;
      level += 1;
      maxLandingSpeed *= 0.9
      sendScore(score);
      pushHighScore(score)
    } else {
      level = 0
      score = 0;
      totalScore = 0;
    }
    messageBox();
  }

  function pushHighScore(score) {
    // if (score > highestScore) {
    //   highestScore = score;
    // }
    for (let i = 0; i < highScore.length; i++) {
      if (score > highScore[i]) {
        highScore.splice(i, 0, score);
        break;
      }
    }
    if (highScore.length > 10) {
      highScore.pop();
    }
  }

  function messageBox() {
    var width = 200;
    var height = 150;
    var x = view.width / 2 - width / 2;
    var y = view.height / 2 - height / 2;
    var time = timeElapsed;

    s.push();
    s.fill(200, 200, 200);
    s.rect(x, y, width, height);
    s.fill(0, 0, 0);
    s.noStroke();
    s.textSize(20);
    s.text(message, x + 20, y + 30);
    s.textSize(12);
    s.text(
      "impact velocity: " + parseFloat(rocket.speed()).toFixed(2) + "m/s",
      x + 20,
      y + 50
    );
    s.text("fuel left: " + Math.floor(rocket.fuel) + "%", x + 20, y + 65);
    s.text(
      "Time elapsed: " + parseFloat(time).toFixed(2) + "s",
      x + 20,
      y + 80
    );
    s.textSize(17);
    s.text("Score: " + score, x + 20, y + 110);
    s.text("Total Score: " + totalScore, x + 20, y + 130);
    s.pop();
  }

  function drawArrowButton(constraints, direction ) {
    // console.log(constraints);
    
    const width =  constraints.x1 - constraints.x0
    const height = constraints.y1 - constraints.y0
    s.push()
    s.fill(255,255,255)
    s.rect(constraints.x0, constraints.y0, width, height)
    s.fill(0,0,0)
    s.text(direction, constraints.x0 + width / 2 - 3, constraints.y0 + height / 2 )
    s.pop()
  }

  function drawArrowButtons() {
    drawArrowButton(buttonUp, "↑")
    drawArrowButton(buttonLeft, "←")
    drawArrowButton(buttonRight, "→")
  }

  s.draw = () => {
    s.clear();
    renderGame(rocket.x, rocket.y);

    if (gameRunning) {
      rocket = controls(rocket);
      rocket = rocketMovement(rocket);
      checkCollision();
    } else {
      startButton(view.width + 7 + 25, 10);
    }
    if (message) {
      messageBox();
    }

    drawArrowButtons()
    miniMap();
    displayShipData();
    showHighscore();
  };
}
