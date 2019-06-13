var mapImage = loadImage("maps/lvl1_bg.jpg");
var rocketSprite = loadImage("assets/croppet.png");
var jetSprite = loadImage("assets/jet.png");
var jetSprite2 = loadImage("assets/jet2.png");
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

function Rocket() {
  this.x = 500;
  this.y = 100;
  this.vx = Math.floor(Math.random() * 2) + 2;
  this.vy = 0;
  this.angle = 0;
  this.va = Math.random() * 0.015 + 0.01;
  this.height = 150;
  this.width = 150;
  this.fuel = 100;
  this.blasting = false;
  this.speed = function() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  };
  return this;
}
rocket = Rocket();

var world = {
  height: 1500,
  width: 2000
};
var view = {
  height: 600,
  width: 600,
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
var maxLandingSpeed = 2;
var highScore = [
  100000,
  80000,
  60000,
  50000,
  40000,
  30000,
  20000,
  15000,
  10000,
  5000
];
var score, scoreFuel, scoreTime, scoreVelocity;

function startButton(x, y) {
  var width = 50;
  var height = 30;
  fill(255, 255, 255);
  rect(x, y, width, height);
  fill(0, 0, 0);
  text("start", x + 10, y + 20);
  var mouseOverStart =
    mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height;

  if (mouseOverStart && mouseIsPressed) {
    startNewGame();
  }
}

function startNewGame() {
  gameRunning = true;
  rocket = Rocket();
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
  var y = 75;
  var width = 100;
  var height = 100;
  push();
  fill(255, 255, 255);
  rect(x, y, width, height);

  var miniRocketX = (rocket.x / world.width) * width + x;
  var miniRocketY = (rocket.y / world.height) * height + y;
  fill(0, 255, 0);
  rect(miniRocketX, miniRocketY, 1, 1);
  pop();

  for (i = 0; i < landline.length; i++) {
    var dot = landline[i];
    var prevDot = i > 0 ? landline[i - 1] : dot;

    fill(255, 255, 255);
    noStroke();
    var faktor = width;
    var dotX = x + dot[0] * width;
    var dotY = y + dot[1] * height;
    var prevDotX = x + prevDot[0] * width;
    var prevDotY = y + prevDot[1] * height;
    stroke(0, 0, 0);
    //rect( dotX, dotY, 1,1);
    line(prevDotX, prevDotY, dotX, dotY);
  }
}

function fuelMeter() {
  var bar = "",
    nextSign;
  for (i = 1; i <= 20; i++) {
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
  var y = 195;
  var width = 100;
  var height = 100;
  fill(255, 255, 255);
  rect(x, y, width, height);
  fill(0, 0, 0);
  text(
    "speed: " + parseFloat((10 * rocket.speed()) / 10).toFixed(1) + " m/s",
    x + 2,
    y + 15
  );
  text("fuel: " + fuelMeter(), x + 2, y + 35);
  text("time: " + parseFloat(timeElapsed).toFixed(1) + "s", x + 2, y + 55);
}

function showHighscore() {
  var x = view.width + 7;
  var y = 300;
  var width = 100;
  var height = 200;
  push();
  fill(255, 255, 255);
  rect(x, y, width, height);
  fill(0, 0, 0);
  for (i = 0; i < highScore.length; i++) {
    text(highScore[i], x + 10, y + 20 + 15 * i);
  }
  pop();
}

function controls(oldRocket) {
  var newRocket = oldRocket;
  if (fuel <= 0) {
    rocket.blasting = false;
    return newRocket;
  }
  //Key Up
  if (keyIsDown(38)) {
    newRocket.fuel -= fuelConsumption;
    newRocket.vy =
      newRocket.vy - (enginePower * 1 - Math.abs(newRocket.angle / PI));
    newRocket.vx = newRocket.vx + enginePower * ((newRocket.angle / PI) * 1.5);
    newRocket.blasting = true;
  } else {
    newRocket.blasting = false;
  }
  //KEY: Left
  if (keyIsDown(37)) {
    newRocket.va -= 0.001;
  }
  //KEY: Right
  if (keyIsDown(39)) {
    newRocket.va += 0.001;
  }
  if (Math.abs(rocket.angle) >= PI) {
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
  image(
    mapImage,
    x + (world.width - world.width * view.zoom) / 2,
    y + (world.height - world.height * view.zoom) / 2,
    world.width * view.zoom,
    world.height * view.zoom
  );
  fill(0, 0, 0);
  rect(0, view.height, 1000, 1000);
  rect(view.width, 0, 1000, 1000);

  /*for ( i=0; i<landline.length; i++) {
    var dot = landline[i];
    var prevDot = i>0 ? landline[i-1] : dot;

    fill(255,255,255);
    noStroke();
    var faktor = world.width; 
    var dotX = x + dot[0] * world.width;
    var dotY = y + dot[1] * world.height;
    var prevDotX = x + prevDot[0] * world.width;
    var prevDotY = y + prevDot[1] * world.height;
    rect( dotX, dotY, 2, 2);
    stroke(255,255,255);
    line(prevDotX, prevDotY, dotX, dotY);
  }*/
}

function renderRocket(offsetX, offsetY) {
  push();
  translate(view.width / 2 + offsetX, view.height / 2 + offsetY);
  rotate(rocket.angle);
  translate(-rocket.width / 2, -rocket.height / 2);
  image(rocketSprite, 0, 0, rocket.height, rocket.width);
  if (rocket.blasting) {
    if (Math.floor(rocket.speed() * 10) % 2 != 0) {
      image(jetSprite, 22, 95, 102, 50);
    } else {
      image(jetSprite2, 29, 95, 90, 50);
    }

    /*
    rotate(PI);
    image(jetSprite, -150, -170, 20, 30);
    image(jetSprite, -108, -180, 20, 30);
    image(jetSprite, -40, -180, 20, 30);
    image(jetSprite, -20, -167, 20, 30);*/
  }
  pop();
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

function hasGroundContact() {
  var curDotL = [], prevDotL = [], curDotR = [], prevDotR = [];
  var RocketLeftMapX = (rocket.x - rocket.width / 3) / world.width;
  var RocketRightMapX = (rocket.x + rocket.width / 3) / world.width;
  var RocketMapY = (rocket.y + rocket.height / 2 - 20) / world.height;
  rect(
    backgroundX + RocketLeftMapX * world.width,
    backgroundY + RocketMapY * world.height,
    2,
    2
  );
  rect(
    backgroundX + RocketRightMapX * world.width,
    backgroundY + RocketMapY * world.height,
    2,
    2
  );
  for (i = 0; i < landline.length; i++) {
    var curDot = landline[i], prevDot = landline[i-1];
    if (
      RocketLeftMapX < curDot[0] &&
      RocketLeftMapX > prevDot[0] &&
      curDot
    ) {
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
  console.log(curDotR[0]);

  var percentOfSectionXL =
    (RocketLeftMapX - prevDotL[0]) / (curDotL[0] - prevDotL[0]);
  var percentOfSectionXR =
    (RocketRightMapX - prevDotR[0]) / (curDotR[0] - prevDotR[0]);
  var yOfPointL =
    percentOfSectionXL * curDotL[1] + (1 - percentOfSectionXL) * prevDotL[1];
  var yOfPointR =
    percentOfSectionXR * curDotR[1] + (1 - percentOfSectionXR) * prevDotR[1];

  //rect(backgroundX + curDot[0]*world.width, backgroundY + curDot[1]*world.height, 2, 2);
  if (RocketMapY >= yOfPointR || RocketMapY >= yOfPointL) {
    console.log(yOfPointR + " " + yOfPointR);
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

  startButton(view.width + 7, 25);
  if (playerWins) {
    scoreVelocity = (1 / rocket.speed()) * 50;
    scoreFuel = 1000 / (100.1 - rocket.fuel);
    scoreTime = (1 / (timeElapsed - 7)) * 60;
    score = Math.floor(500 * (scoreVelocity + scoreFuel + scoreTime));
    console.log(
      " v: " + scoreVelocity + " t: " + scoreTime + " f: " + scoreFuel
    );

    for (i = 0; i < highScore.length; i++) {
      if (score > highScore[i]) {
        highScore.splice(i, 0, score);
        break;
      }
    }
    if (highScore.length > 10) {
      highScore.pop();
    }
  } else {
    score = 0;
  }
  messageBox();
}

function messageBox() {
  var width = 200;
  var height = 120;
  var x = view.width / 2 - width / 2;
  var y = view.height / 2 - height / 2;
  var time = timeElapsed;

  push();
  fill(200, 200, 200);
  rect(x, y, width, height);
  fill(0, 0, 0);
  noStroke();
  textSize(20);
  text(message, x + 20, y + 30);
  textSize(12);
  text(
    "impact velocity: " + parseFloat(rocket.speed()).toFixed(2) + "m/s",
    x + 20,
    y + 50
  );
  text("fuel left: " + Math.floor(rocket.fuel) + "%", x + 20, y + 65);
  text("Time elapsed: " + parseFloat(time).toFixed(2) + "s", x + 20, y + 80);
  textSize(17);
  text("Score: " + score, x + 20, y + 110);
  pop();
}

function draw() {
  clear();
  renderGame(rocket.x, rocket.y);

  if (gameRunning) {
    rocket = controls(rocket);
    rocket = rocketMovement(rocket);
    checkCollision();
  } else {
    startButton(view.width + 7 + 25, 25);
  }
  if (message) {
    messageBox();
  }

  miniMap();
  displayShipData();
  showHighscore();
}
