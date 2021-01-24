//var img = loadImage('test.png');


function draw() {
  //  image(img,10,10,400,300);
}

var scale =0.5;
lifeX = 0;
lifeY =0;
noStroke();
rect(lifeX+90*scale,lifeY+100*scale,40*scale,10*scale);
rect(lifeX+100*scale,lifeY+84*scale,20*scale,6*scale);
rect(lifeX+130*scale,lifeY+100*scale,40*scale,10*scale);
rect(lifeX+140*scale,lifeY+84*scale,20*scale,6*scale);
rect(lifeX+95*scale,lifeY+90*scale,32*scale,10*scale);
rect(lifeX+134*scale,lifeY+90*scale,32*scale,10*scale);
rect(lifeX+100*scale,lifeY+110*scale,60*scale,10*scale);
rect(lifeX+110*scale,lifeY+120*scale,40*scale,10*scale);
rect(lifeX+120*scale,lifeY+130*scale,20*scale,8*scale);
rect(lifeX+125*scale,lifeY+138*scale,10*scale,6*scale);

/*function preload() {
  img = loadImage('test.png');
}
function setup() {
  image(img, 0, 0);
}
*/



var raupiBody = [];

//img
var scoreImg = loadImage("score.png");
var careful = loadImage("careful.png");
var headline = loadImage("letsstartsimple.png");
var gameOver1 = loadImage("gameover1_1.jpg");
var gameOver2 = loadImage("gameover1_2.jpg");
var raupi =loadImage("raupi.png");
var blatt = loadImage("bg.png");

var start = loadImage("start1.png");
var startHover = loadImage("start2.png");

var box = 20;
var robL = 1;
var lives = 2;
var lifeX = 0;
var lifeY = 0;
var score = 0;

var dir; //default raupi immobile

function karoMuster() {
    var count = 0;
    var karoX = 0;
    var karoY = 0;
    var m = 40;

    while (count <= 600) {
        line(karoX, count + m + 20, 640 + m, m + 20 + count);
        line(count + m + 20, karoY, m + 20 + count, 640 + m);
        count = count + m;
    }
}
function keydown() {
    if (keyIsDown(37) && dir !== "right") {
        dir = "left";
    }
    if (keyIsDown(38) && dir !== "down") {
        dir = "up";
    }
    if (keyIsDown(39) && dir !== "left") {
        dir = "right";
    }
    if (keyIsDown(40) && dir !== "up") {
        dir = "down";
    }
}
function keyReleased() {
    console.log("key - " + keyCode);
}

//setting keyboard controls, stop raupirino from reversing

//the good fruit2
var fruit2 = {
    a: 400,
    b: 300,

    canv: function () {
        fill(250, 20, 20);
        ellipse(this.a, this.b, box, box);
    },
    eat: function () {
        this.a = Math.floor(Math.random() * 17 + 7) * box;
        this.b = Math.floor(Math.random() * 15 + 11) * box;
    }
};

//sssnek
var raupi = {
    x: 80,
    y: 180,
    canv: function () {
        fill(200, 200, 200);
        //ellipse(this.x, this.y, box, box);
        for (var i = 0; i < raupiBody.length; i++) {
            ellipse(raupiBody[i].x, raupiBody[i].y, box, box);
        }
    }
};

function draw() {

    if (sc==0){
        background(0);
        image(start, 0, 0, 750, 790);

        if (mouseY >= 220 && mouseY <= 460 && mouseX >= 250 && mouseY <=610){
        image(startHover,0,0,750,790);

    }   if (mouseY >= 220 && mouseY <= 460 && mouseX >= 250 && mouseY <=610&&mouseIsPressed){
        sc = 1 ;
    }
}
    
    if (sc==1){ clear();

    //slow down raupi
    frameRate(8);

    fill(30);
    stroke(250);
    rect(50, 150, 700, 550, 40);

    noStroke();
    rect(345, 100, 100, 100);

    //strokeWeight();
    fill(250);
    //karoMuster();

    //headline
    image(headline, 220, 30, 350, 110);
    //score
    text("00" + score, 360, 170);
    image(scoreImg, 340, 70, 130, 80);
    textSize(40);
    keydown();
    //noStroke(0);
    fruit2.canv();
    raupi.canv();

    // snek eats snack
    if (raupi.x === fruit2.a && raupi.y === fruit2.b) {
        snekL++;
        score++;
        console.log(score);
        fruit2.eat();
    }

    //raupirino moves, extend snak
    raupiBody.push({ x: raupi.x, y: raupi.y });
    if (raupiBody.length > snekL) {
        raupiBody.splice(0, 1);
    }

    //direction
    if (dir == "right") {
        raupi.x = raupi.x + box;
    }
    if (dir == "left") {
        raupi.x = raupi.x - box;
    }
    if (dir == "up") {
        raupi.y = raupi.y - box;
    }
    if (dir == "down") {
        raupi.y = raupi.y + box;
    }

    //collision wall
    for (var i = 0; i < raupiBody.length; i++) {
        if (
            raupiBody.length != 1 &&
            raupi.x == raupiBody[i].x &&
            raupi.y == raupiBody[i].y
        ) {
            console.log("ouch - 1 heart");
            fill(250);
            image(careful, 280, 700, 230, 190);
            lives = lives - 1;
        }
        if (raupi.x >= 750 || raupi.x <= 50 || raupi.y <= 150 || raupi.y >= 700) {
            
            console.log("collision - 1 heart");
            image(careful, 280, 700, 230, 190);
            lives = lives - 1;
        }
        if (lives == 0) {
            sc = 2;
        }}}}