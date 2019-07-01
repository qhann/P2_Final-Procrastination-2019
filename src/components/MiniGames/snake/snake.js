import p5 from "p5";
import scoreImgFile from "./score.png";
import carefulFile from "./careful.png";
import headlineFile from "./letsstartsimple.png";
import gameOver1File from "./gameover1_1.jpg";
import gameOver2File from "./gameover1_2.jpg";
import raupiIMGFile from "./raupi.png";
import blattFile from "./bg.png";
import fruitFile from "./fruit.png";
import plaumeFile from "./pflaumenFangen.png";
import nimmersattFile from "./nimmersatt.png";
import startFile from "./start1.png";
import startHoverFile from "./start2.png";

export default function snake(s) {
  let width = 1920 * 0.5;
  let height = 800//1080 * 0.5;
  // console.log(height);

  s.setup = () => {
    s.createCanvas(width, height);
    s.frameRate(40);
  };

  //variables
  var sc = 0;
  var snakeBody = [];
  var raupiBody = [];

  //img
  var scoreImg = s.loadImage(scoreImgFile);
  var careful = s.loadImage(carefulFile);
  var headline = s.loadImage(headlineFile);
  var gameOver1 = s.loadImage(gameOver1File);
  var gameOver2 = s.loadImage(gameOver2File);
  var raupiIMG = s.loadImage(raupiIMGFile);
  var blatt = s.loadImage(blattFile);
  var fruit = s.loadImage(fruitFile);
  var plaume = s.loadImage(plaumeFile);
  var nimmersatt = s.loadImage(nimmersattFile);

  var start = s.loadImage(startFile);
  var startHover = s.loadImage(startHoverFile);

  var box = 20;
  var bx = 60;
  var snekL = 1;
  var robL = 1;
  var lives = 2;
  var lifeX = 0;
  var lifeY = 0;
  var score = 0;

  var dir; //default snake immobile

  function karoMuster() {
    var count = 0;
    var karoX = 0;
    var karoY = 0;
    var m = 40;

    while (count <= 600) {
      s.line(karoX, count + m + 20, 640 + m, m + 20 + count);
      s.line(count + m + 20, karoY, m + 20 + count, 640 + m);
      count = count + m;
    }
  }

  function keydown() {
    if (s.keyIsDown(37) && dir !== "right") {
      dir = "left";
    }
    if (s.keyIsDown(38) && dir !== "down") {
      dir = "up";
    }
    if (s.keyIsDown(39) && dir !== "left") {
      dir = "right";
    }
    if (s.keyIsDown(40) && dir !== "up") {
      dir = "down";
    }
  }
  function keyReleased() {
    console.log("key - " + s.keyCode);
  }

  //setting keyboard controls, stop snakerino from reversing

  var food = {
    a: 400,
    b: 300,

    canv: function() {
      s.fill(250, 20, 20);
      s.ellipse(this.a, this.b, box, box);
    },
    eat: function() {
      this.a = Math.floor(Math.random() * 17 + 7) * box;
      this.b = Math.floor(Math.random() * 15 + 11) * box;
    }
  };

  var snake = {
    x: 80,
    y: 180,
    canv: function() {
      s.fill(200, 200, 200);
      //s.ellipse(this.x, this.y, box, box);
      for (var i = 0; i < snakeBody.length; i++) {
        s.ellipse(snakeBody[i].x, snakeBody[i].y, box, box);
      }
    }
  };

  var fruit2 = {
    m: 400,
    n: 550,

    canv: function() {
      s.fill(250, 20, 20);
      s.image(fruit, this.m, this.n, bx, bx);
    },
    eat: function() {
      this.m = Math.floor(Math.random() * 5 + 1) * bx;
      this.n = Math.floor(Math.random() * 5 + 3) * bx;
    }
  };

  var raupi = {
    c: 100,
    d: 190,
    canv: function() {
      //s.ellipse(this.x, this.y, box, box);
      for (var u = 0; u < raupiBody.length; u++) {
        s.image(raupiIMG, raupiBody[u].c, raupiBody[u].d, bx, bx);
      }
    }
  };
  s.draw = () => {
    if (sc == 0) {
      s.background(0);
      s.image(start, 0, 0, 750, 790);

      if (
        s.mouseY >= 220 &&
        s.mouseY <= 460 &&
        s.mouseX >= 250 &&
        s.mouseY <= 610
      ) {
        s.image(startHover, 0, 0, 750, 790);
      }
      if (
        s.mouseY >= 220 &&
        s.mouseY <= 460 &&
        s.mouseX >= 250 &&
        s.mouseY <= 610 &&
        s.mouseIsPressed
      ) {
        sc = 1;
      }
    }

    if (sc == 1) {
      s.clear();

      //slow down snake
      s.frameRate(8);

      s.fill(30);
      s.stroke(250);
      s.rect(50, 150, 700, 550, 40);

      s.noStroke();
      s.rect(345, 100, 100, 100);

      //strokeWeight();
      s.fill(250);
      //karoMuster();
      s.image(careful, 280, 700, 230, 190);

      //headline
      s.image(headline, 220, 30, 350, 110);
      //score
      s.text("00" + score, 360, 170);
      s.image(scoreImg, 340, 70, 130, 80);
      s.textSize(40);
      keydown();
      //s.noStroke(0);
      food.canv();
      snake.canv();

      if (snake.x === food.a && snake.y === food.b) {
        snekL++;
        score++;
        console.log(score);
        food.eat();
      }

      snakeBody.push({ x: snake.x, y: snake.y });
      if (snakeBody.length > snekL) {
        snakeBody.splice(0, 1);
      }

      if (dir == "right") {
        snake.x = snake.x + box;
      }
      if (dir == "left") {
        snake.x = snake.x - box;
      }
      if (dir == "up") {
        snake.y = snake.y - box;
      }
      if (dir == "down") {
        snake.y = snake.y + box;
      }

      for (var i = 0; i < snakeBody.length; i++) {
        if (
          snakeBody.length != 1 &&
          snake.x == snakeBody[i].x &&
          snake.y == snakeBody[i].y
        ) {
          console.log("ouch - 1 heart");
          s.fill(250);

          lives = lives - 1;
        }
        if (
          snake.x >= 750 ||
          snake.x <= 50 ||
          snake.y <= 150 ||
          snake.y >= 700
        ) {
          console.log("collision - 1 heart");
          s.image(careful, 280, 700, 230, 190);
          lives = lives - 1;
        }
        if (lives == 0) {
          sc = 2;
        }
      }

      //live bar
      for (lifeX = 0; lifeX <= lives; lifeX++) {
        s.fill(200, 50, 50);
        // s.rect(lifeX*30+500,lifeY+660,20,20);
        s.noStroke();
        s.rect(lifeX * 60 + 567, lifeY + 650, 15, 5);
        s.rect(lifeX * 60 + 588, lifeY + 650, 15, 5);
        s.rect(lifeX * 60 + 569, lifeY + 647, 10, 3);
        s.rect(lifeX * 60 + 590, lifeY + 647, 10, 3);
        s.rect(lifeX * 60 + 564, lifeY + 655, 42, 7);
        s.rect(lifeX * 60 + 568, lifeY + 659, 35, 7);
        s.rect(lifeX * 60 + 573, lifeY + 666, 26, 5);
        s.rect(lifeX * 60 + 578, lifeY + 670, 17, 5);
        s.rect(lifeX * 60 + 583, lifeY + 675, 8, 4);
        s.fill(250);
      }
    }

    if (sc == 1 && score == 5) {
      sc = 3;
    }
    ///SCREEN 3
    if (sc == 3) {
      score = 5;

      s.frameRate(5);
      s.background(250);
      s.image(blatt, 50, 150, 700, 600);
      s.image(plaume, 50, 740, 360, 50);
      s.image(nimmersatt, -30, 20, 660, 200);
      s.stroke(150, 90, 90);
      s.fill(150, 100, 100);
      s.textSize(30);
      //s.text("Score: "+score,640,780);
      keydown();
      //s.noStroke(0);
      fruit2.canv();
      raupi.canv();

      if (
        raupi.c <= fruit2.m + 50 &&
        raupi.c >= fruit2.m - 50 &&
        raupi.d <= fruit2.n + 50 &&
        raupi.d >= fruit2.n - 50
      ) {
        robL++;
        score++;
        console.log(score);
        fruit2.eat();
      }

      raupiBody.push({ c: raupi.c, d: raupi.d });
      if (raupiBody.length > robL) {
        raupiBody.splice(0, 1);
      }

      //direction
      if (dir == "right") {
        raupi.c = raupi.c + bx;
      }
      if (dir == "left") {
        raupi.c = raupi.c - bx;
      }
      if (dir == "up") {
        raupi.d = raupi.d - bx;
      }
      if (dir == "down") {
        raupi.d = raupi.d + bx;
      }

      //collision wall
      for (var u = 0; u < raupiBody.length; u++) {
        if (
          raupi.c >= 800 ||
          raupi.c <= -50 ||
          raupi.d <= 100 ||
          raupi.d >= 800
        ) {
          console.log("collision - 1 heart");
          s.image(careful, 280, 700, 230, 190);
          sc = 4;
        }
      }
    }

    //first game over screen
    if (lives == 0 && sc == 2) {
      s.background(0);
      s.image(gameOver1, 0, 0, 750, 790);

      if (
        s.mouseY >= 220 &&
        s.mouseY <= 460 &&
        s.mouseX >= 250 &&
        s.mouseY <= 610
      ) {
        s.image(gameOver2, 0, 0, 750, 790);
      }
      if (
        s.mouseY >= 220 &&
        s.mouseY <= 460 &&
        s.mouseX >= 250 &&
        s.mouseY <= 610 &&
        s.mouseIsPressed
      ) {
        sc = 1;
        snakeBody.length = 1;
        snekL = 1;
        score = 0;
        lives = 2;
        dir = null;
        snake = {
          x: 80,
          y: 180,
          canv: function() {
            s.fill(200, 200, 200);
            //s.ellipse(this.x, this.y, box, box);
            for (var i = 0; i < snakeBody.length; i++) {
              s.ellipse(snakeBody[i].x, snakeBody[i].y, box, box);
            }
          }
        };
      }
    }
    if (sc == 4) {
      s.background(0);
      s.image(gameOver1, 0, 0, 750, 790);

      if (
        s.mouseY >= 220 &&
        s.mouseY <= 460 &&
        s.mouseX >= 250 &&
        s.mouseY <= 610
      ) {
        s.image(gameOver2, 0, 0, 750, 790);
      }
      if (
        s.mouseY >= 220 &&
        s.mouseY <= 460 &&
        s.mouseX >= 250 &&
        s.mouseY <= 610 &&
        s.mouseIsPressed
      ) {
        sc = 3;
        raupiBody.length = 1;
        robL = 1;
        score = 0;
        dir = null;
        raupi = {
          c: 100,
          d: 190,
          canv: function() {
            s.fill(200, 200, 200);
            //s.ellipse(this.x, this.y, box, box);
            for (var u = 0; u < raupiBody.length; u++) {
              s.image(raupiIMG, raupiBody[u].c, raupiBody[u].d, bx, bx);
            }
          }
        };
      }
    }
  };
}
