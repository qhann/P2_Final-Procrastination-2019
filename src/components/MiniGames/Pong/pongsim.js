import p5 from "p5";
import dschungel1 from "./img/dschungel1.png";
import dschungel2 from "./img/dschungel2.jpg";
import dschungel3 from "./img/dschungel3.jpg";

export default function pongSketch(s) {
  s.setup = () => {
    s.createCanvas(670, 640);
    s.frameRate(40);
  };

  const buttonScale = 1.5
  const buttonSize = {
    width: 40 * buttonScale,
    height: 30 * buttonScale
  }

  const buttonUp = {
    x0: 615 ,
    x1: 615  + buttonSize.width,
    y0: 640 / 2 - 80, 
    y1: 640 / 2 - 80 + buttonSize.height, 
  }
  
  const buttonDown = {
    x0: 615 ,
    x1: 615 + buttonSize.width,
    y0: 640 / 2 - 80 + buttonSize.height, 
    y1: 640 / 2 - 80 + buttonSize.height * 2, 
  }

  var sendScore
  s.myCustomRedrawAccordingToNewPropsHandler = function(newProps) {
    if (newProps.getScore) {
      sendScore = newProps.getScore;
    }
  };

  var ball = {
    x: 300,
    y: 250
  };

  var direction = {
    x: 1,
    y: 1
  };

  var paddle = {
    Lx: 4,
    Ly: 200,
    Rx: 599,
    Ry: 200
  };

  var score1 = 0;
  var score2 = 0;

  var z = 0;

  var countdown = 60;
  var countdown1 = 60;

  //rx = Bewegung in x
  var rx = s.ceil(s.random(2, ges));

  //ry = Bewegung in y
  // wurzel von (geschwindigkeitquadrat - rxquadrat)
  var ry = s.sqrt(s.sq(ges) - s.sq(rx));

  //Ball Geschwindigkeit
  var ges = 10;

  let botSpeed = 1

  function resetball() {
    ball.x = 300;
    ball.y = 250;
    paddle.Lx = 4;
    paddle.Ly = 200;
    paddle.Rx = 599;
    paddle.Ry = 200;
    changewinkel();
  }

  function changewinkel(yPosPaddleRatio) {
    console.log(yPosPaddleRatio );
    
    ry = (yPosPaddleRatio || 0.5) * 6 + 2;
    rx = s.sqrt(s.sq(ges) - s.sq(ry));
  }

  var scr1 = s.loadImage(dschungel2);
  var scr2 = s.loadImage(dschungel3);

  resetball()

  function drawArrowButton(constraints, direction ) {
    // console.log(constraints);
    
    const width =  constraints.x1 - constraints.x0
    const height = constraints.y1 - constraints.y0
    s.push()
    s.fill(255,255,255)
    s.strokeWeight(1)
    s.stroke(0,0,0)
    s.rect(constraints.x0, constraints.y0, width, height)
    s.fill(0,0,0)
    s.textSize(18)
    s.text(direction, constraints.x0 + width / 2 , constraints.y0 + height / 2 + 3 )
    s.pop()
  }

  function drawArrowButtons() {
    drawArrowButton(buttonUp, "↑")
    drawArrowButton(buttonDown, "↓")
    // drawArrowButton(buttonRight, "→")
  }

  s.draw = () => {

    // console.log(z);
    //Zustand 0 = Startseite
    if (z === 0) {
      s.clear();
      // background(193, 255, 193);
      s.image(scr1, 0, 0, 610, 550);

      //Rahmen
      s.fill(0, 255, 0);
      s.rect(0, 0, 3, 548);
      s.rect(3, 0, 610, 3);
      s.rect(610, 3, 3, 548);
      s.rect(0, 548, 610, 3);

      s.fill(0, 255, 0);
      s.noStroke();
      s.textWidth(5);
      s.textFont("Courier");
      s.textSize(130);
      s.textAlign(s.CENTER);
      s.text("Pong", 300, 150);

      //Button
      s.noFill();
      s.stroke(0, 255, 0);
      s.rect(193, 310, 210, 80);
      s.fill(0, 255, 0);

      s.textSize(53);
      s.textAlign(s.CENTER);
      s.text("Start", 300, 365);

      s.noStroke();
      s.textSize(30);
      s.text("🍌", s.mouseX, s.mouseY);

      //Baum
      s.fill(139, 71, 38);
      s.rect(50, 255, 40, 295);
      s.fill(0, 100, 0);
      s.ellipse(10, 260, 80);
      s.ellipse(30, 200, 80);
      s.ellipse(70, 170, 80);
      s.ellipse(110, 200, 80);
      s.ellipse(130, 260, 80);
      s.ellipse(70, 265, 80);
      s.ellipse(70, 220, 30);

      s.fill(139, 71, 38);
      s.rect(500, 335, 40, 215);
      s.fill(0, 100, 0);
      s.ellipse(460, 300, 80);
      s.ellipse(480, 240, 80);
      s.ellipse(520, 210, 80);
      s.ellipse(560, 240, 80);
      s.ellipse(580, 300, 80);
      s.ellipse(520, 305, 80);
      s.ellipse(520, 260, 30);

      //Zustand 0 -> 1
      if (
        s.mouseIsPressed === true &&
        s.mouseX > 193 &&
        s.mouseX < 400 &&
        s.mouseY > 305 &&
        s.mouseY < 395
      ) {
        z = 1;
      }
    }

    // Zustand 1 Spiel
    if (z === 1) {

      s.clear();
      s.noStroke();
      // background(193, 255, 193);
      s.image(scr1, 0, 0, 610, 550);
      //PLayer
      s.fill(0, 255, 0);
      s.textSize(27);
      s.text("Player 1", 110, 30);
      s.text("Player 2", 495, 30);

      // Mittellinie
      s.fill(0, 255, 0);
      // s.rect(305, 70, 3, 475);
      s.rect(305, 70, 3, 25);
      s.rect(305, 110, 3, 25);
      s.rect(305, 150, 3, 25);
      s.rect(305, 190, 3, 25);
      s.rect(305, 230, 3, 25);
      s.rect(305, 270, 3, 25);
      s.rect(305, 310, 3, 25);
      s.rect(305, 350, 3, 25);
      s.rect(305, 390, 3, 25);
      s.rect(305, 430, 3, 25);
      s.rect(305, 470, 3, 25);
      s.rect(305, 510, 3, 25);

      //Rahmen
      s.rect(0, 0, 3, 548);
      s.rect(3, 0, 610, 3);
      s.rect(610, 3, 3, 548);
      s.rect(0, 548, 610, 3);

      //Spielstand
      s.fill(0, 255, 0);
      s.textSize(50);
      s.textAlign(s.CENTER);
      s.text(score1 + " : " + score2, 306, 50);

      
      ball.y = ball.y ? ball.y : 250
      console.log(ball.y);
      //Ball
      s.fill(0, 150, 255);
      // s.ellipse(ball.x, ball.y, 30);
      s.textSize(30);
      s.text("🐵", ball.x, ball.y);

      //Paddel
      s.fill(255, 215, 0);
      // s.rect(paddle.Lx, paddle.Ly, 10, 100, 20);
      s.textSize(23);
      s.text("🍌", paddle.Lx + 15, paddle.Ly);
      s.text("🍌", paddle.Lx + 15, paddle.Ly + 90);
      s.text("🍌", paddle.Lx + 15, paddle.Ly + 60);
      s.text("🍌", paddle.Lx + 15, paddle.Ly + 30);

      // s.rect(paddle.Rx, paddle.Ry, 10, 100, 20);
      s.text("🍌", paddle.Rx - 5, paddle.Ry);
      s.text("🍌", paddle.Rx - 5, paddle.Ry + 90);
      s.text("🍌", paddle.Rx - 5, paddle.Ry + 60);
      s.text("🍌", paddle.Rx - 5, paddle.Ry + 30);

      //Ball wird schneller
      // console.log(z);
      if (score1 + score2 == 5) {
        ges = 11;
      } else if (score1 + score2 == 10) {
        ges = 12;
      } else if (score1 + score2 == 20) {
        ges = 14;
      }

      ges = score2/2 + 10

      //Rahmen, Ball Richtung Winkel, Score erhöhen
      if (ball.x < 590 && direction.x > 0) {
        ball.x = ball.x + rx;
        if (ball.x >= 590) {
          resetball();
          score1 = score1 + 1;
          direction.x = -1;
        }
      } else {
        ball.x = ball.x - rx;
        if (ball.x <= 18) {
          resetball();
          score2 += 1;
          sendScore(score2)
          botSpeed += 1
          direction.x = 1;
        }
      }

      if (ball.y < 530 && direction.y > 0) {
        ball.y = ball.y + ry;
        if (ball.y >= 530) {
          direction.y = -1;
        }
      } else {
        ball.y = ball.y - ry;
        if (ball.y <= 36) {
          direction.y = 1;
        }
      }
      // console.log(paddle.Ly);
      // console.log(ball.y);
      //Paddles bewegen

      if (paddle.Ly > ball.y && ball.x < 400) {
        paddle.Ly = paddle.Ly - botSpeed;
      }
      if (paddle.Ly >= 440) {
        paddle.Ly = 440;
      }

      if (paddle.Ly < ball.y && ball.x < 400) {
        paddle.Ly = paddle.Ly + botSpeed;
      }
      if (paddle.Ly <= 24) {
        paddle.Ly = 24;
      }

      let buttonUpPressed = (s.mouseIsPressed && s.mouseX > buttonUp.x0 && s.mouseX < buttonUp.x1 && s.mouseY > buttonUp.y0 && s.mouseY < buttonUp.y1)
      let buttonDownPressed = (s.mouseIsPressed && s.mouseX > buttonDown.x0 && s.mouseX < buttonDown.x1 && s.mouseY > buttonDown.y0 && s.mouseY < buttonDown.y1)

      //Paddle rechts
      if (s.keyIsDown(38) || buttonUpPressed) {
        paddle.Ry = paddle.Ry - 10;
      }
      if (paddle.Ry >= 440) {
        paddle.Ry = 440;
      }

      if (s.keyIsDown(40) || buttonDownPressed) {
        paddle.Ry = paddle.Ry + 10;
      }
      if (paddle.Ry <= 24) {
        paddle.Ry = 24;
      }

      if (
        ball.x - 29 < paddle.Lx + 10 &&
        ball.y - 29 < paddle.Ly + 100 &&
        ball.y + 29 >= paddle.Ly &&
        direction.x < 0
      ) {
        direction.x = direction.x * -1;
        changewinkel();
        ball.x = ball.x + direction.x;
      }

      //Paddle abprallen rechts
      if (
        ball.x + 23 > paddle.Rx - 10 &&
        ball.y - 23 >= paddle.Ry - 30 &&
        ball.y - 23 <= paddle.Ry + 80 &&
        direction.x > 0
      ) {
        direction.x = direction.x * -1;
        changewinkel((ball.y - paddle.Ry)/110);
        ball.x = ball.x + direction.x;
      }

      if (score1 + score2 === 10 && countdown > 0) {
        countdown = countdown - 1;
        s.textSize(100);
        s.fill(0, 255, 0);
        s.textAlign(s.CENTER);
        s.text("Level 2", 315, 280);
      }

      if (score1 + score2 === 20 && countdown1 > 0) {
        countdown1 = countdown1 - 1;
        s.textSize(100);
        s.fill(0, 255, 0);
        s.textAlign(s.CENTER);
        s.text("Level 3", 315, 280);
      }

      if (score1 === 10) {
        z = 2;
      }

      // if (score2 === 30) {
      //   z = 3;
      // }
    }

    //Zustand 2 = Player 1 gewinnt
    if (z === 2) {
      s.clear();
      // background(193, 255, 193);
      s.image(scr2, 0, 0, 610, 550);

      //Rahmen
      s.fill(0, 255, 0);
      s.rect(0, 0, 3, 548);
      s.rect(3, 0, 610, 3);
      s.rect(610, 3, 3, 548);
      s.rect(0, 548, 610, 3);

      //gelber Kasten
      s.fill(255, 250, 0, 99);
      s.rect(20, 45, 570, 76);

      s.fill(0, 255, 0);
      s.noStroke();
      s.textSize(70);
      s.textAlign(s.CENTER);
      s.textFont("Courier");
      s.text("Player 1 Wins", 300, 100);

      //Button
      s.stroke(0, 255, 0);
      s.fill(255, 250, 0, 99);
      s.rect(150, 310, 300, 85);
      s.textSize(40);
      s.fill(0, 255, 0);
      s.textAlign(s.CENTER);

      s.fill(0, 255, 0);
      s.text("Start Again", 300, 365);

      s.noStroke();
      s.textSize(30);
      s.text("🍌", s.mouseX, s.mouseY);

      //Baum
      s.fill(139, 71, 38);
      s.rect(50, 255, 40, 295);
      s.fill(0, 100, 0);
      s.ellipse(10, 260, 80);
      s.ellipse(30, 200, 80);
      s.ellipse(70, 170, 80);
      s.ellipse(110, 200, 80);
      s.ellipse(130, 260, 80);
      s.ellipse(70, 265, 80);
      s.ellipse(70, 220, 30);

      s.fill(139, 71, 38);
      s.rect(500, 335, 40, 215);
      s.fill(0, 100, 0);
      s.ellipse(460, 300, 80);
      s.ellipse(480, 240, 80);
      s.ellipse(520, 210, 80);
      s.ellipse(560, 240, 80);
      s.ellipse(580, 300, 80);
      s.ellipse(520, 305, 80);
      s.ellipse(520, 260, 30);

      //Zustand 2 -> 1
      if (
        s.mouseIsPressed === true &&
        s.mouseX > 150 &&
        s.mouseX < 450 &&
        s.mouseY > 310 &&
        s.mouseY < 400
      ) {
        z = 1;
        score1 = 0;
        score2 = 0;
        paddle.Lx = 4;
        paddle.Ly = 200;
        paddle.Rx = 599;
        paddle.Ry = 200;
        // ges = 6;
      }
    }

    //Zustand 3 = Player 2 gewinnt
    if (z === 3) {
      s.clear();
      s.image(scr2, 0, 0, 610, 550);
      // background(193, 255, 193);

      //Rahmen
      s.fill(0, 255, 0);
      s.rect(0, 0, 3, 548);
      s.rect(3, 0, 610, 3);
      s.rect(610, 3, 3, 548);
      s.rect(0, 548, 610, 3);

      //gelber Kasten
      s.fill(255, 250, 0, 99);
      s.rect(20, 45, 570, 76);

      s.fill(0, 255, 0);
      s.noStroke();
      s.textSize(70);
      s.textAlign(s.CENTER);
      s.textFont("Courier");
      s.text("Player 2 Wins", 300, 100);

      //Button
      s.stroke(0, 255, 0);
      s.fill(255, 250, 0, 99);
      s.rect(150, 310, 300, 85);
      s.textSize(40);
      s.fill(0, 255, 0);
      s.textAlign(s.CENTER);

      s.fill(0, 255, 0);
      s.text("Start Again", 300, 365);

      s.noStroke();
      s.textSize(30);
      s.text("🍌", s.mouseX, s.mouseY);

      //Baum
      s.fill(139, 71, 38);
      s.rect(50, 255, 40, 295);
      s.fill(0, 100, 0);
      s.ellipse(10, 260, 80);
      s.ellipse(30, 200, 80);
      s.ellipse(70, 170, 80);
      s.ellipse(110, 200, 80);
      s.ellipse(130, 260, 80);
      s.ellipse(70, 265, 80);
      s.ellipse(70, 220, 30);

      s.fill(139, 71, 38);
      s.rect(500, 335, 40, 215);
      s.fill(0, 100, 0);
      s.ellipse(460, 300, 80);
      s.ellipse(480, 240, 80);
      s.ellipse(520, 210, 80);
      s.ellipse(560, 240, 80);
      s.ellipse(580, 300, 80);
      s.ellipse(520, 305, 80);
      s.ellipse(520, 260, 30);

      //Zustand 3 -> 1
      if (
        s.mouseIsPressed === true &&
        s.mouseX > 150 &&
        s.mouseX < 450 &&
        s.mouseY > 310 &&
        s.mouseY < 400
      ) {
        z = 1;
        score1 = 0;
        score2 = 0;
        paddle.Lx = 4;
        paddle.Ly = 200;
        paddle.Rx = 599;
        paddle.Ry = 200;
        // ges = 6;
      }
    }
    drawArrowButtons()

  };
}
