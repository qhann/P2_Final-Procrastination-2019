//variables
var sc =0;
var snakeBody = [];
var raupiBody = [];

//img
var scoreImg = loadImage("score.png");
var careful = loadImage("careful.png");
var headline = loadImage("letsstartsimple.png");
var gameOver1 = loadImage("gameover1_1.jpg");
var gameOver2 = loadImage("gameover1_2.jpg");
var raupiIMG =loadImage("raupi.png");
var blatt = loadImage("bg.png");
var fruit =loadImage("fruit.png");
var plaume = loadImage("pflaumenFangen.png");
var nimmersatt =loadImage("nimmersatt.png");

var start = loadImage("start1.png");
var startHover = loadImage("start2.png");

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

//setting keyboard controls, stop snakerino from reversing

var food = {
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


var snake = {
    x: 80,
    y: 180,
    canv: function () {
        fill(200, 200, 200);
        //ellipse(this.x, this.y, box, box);
        for (var i = 0; i < snakeBody.length; i++) {
            ellipse(snakeBody[i].x, snakeBody[i].y, box, box);
        }
    }
};


var fruit2 = {
    m: 400,
    n: 550,

    canv: function () {
        fill(250, 20, 20);
        image(fruit,this.m, this.n, bx, bx);
    },
    eat: function () {
        this.m = Math.floor(Math.random() * 5 + 1) * bx;
        this.n = Math.floor(Math.random() * 5 + 3) * bx;
    }
};

var raupi = {
    c: 100,
    d: 190,
    canv: function () {
        //ellipse(this.x, this.y, box, box);
        for (var u = 0; u < raupiBody.length; u++) {
            image(raupiIMG,raupiBody[u].c, raupiBody[u].d, bx, bx);
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

    //slow down snake
    frameRate(8);

    fill(30);
    stroke(250);
    rect(50, 150, 700, 550, 40);

    noStroke();
    rect(345, 100, 100, 100);

    //strokeWeight();
    fill(250);
    //karoMuster();
    image(careful, 280, 700, 230, 190);

    //headline
    image(headline, 220, 30, 350, 110);
    //score
    text("00" + score, 360, 170);
    image(scoreImg, 340, 70, 130, 80);
    textSize(40);
    keydown();
    //noStroke(0);
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
            fill(250);
            
            lives = lives - 1;
        }
        if (snake.x >= 750 || snake.x <= 50 || snake.y <= 150 || snake.y >= 700) {
            
            console.log("collision - 1 heart");
            image(careful, 280, 700, 230, 190);
            lives = lives - 1;
        }
        if (lives == 0) {
            sc = 2;
        }
    }

    //live bar
    for (lifeX = 0; lifeX <= lives; lifeX++) {
        fill(200, 50, 50);
        // rect(lifeX*30+500,lifeY+660,20,20);
        noStroke();
        rect(lifeX * 60 + 567, lifeY + 650, 15, 5);
        rect(lifeX * 60 + 588, lifeY + 650, 15, 5);
        rect(lifeX * 60 + 569, lifeY + 647, 10, 3);
        rect(lifeX * 60 + 590, lifeY + 647, 10, 3);
        rect(lifeX * 60 + 564, lifeY + 655, 42, 7);
        rect(lifeX * 60 + 568, lifeY + 659, 35, 7);
        rect(lifeX * 60 + 573, lifeY + 666, 26, 5);
        rect(lifeX * 60 + 578, lifeY + 670, 17, 5);
        rect(lifeX * 60 + 583, lifeY + 675, 8, 4);
        fill(250);
    }
}


    if (sc ==1 && score == 5 ) {
        sc =3;
    }
 ///SCREEN 3
    if ( sc == 3){
        score = 5;
        

        frameRate(5);
        background(250);
        image(blatt,50,150,700,600);
        image(plaume,50,740,360,50);
        image(nimmersatt,-30,20,660,200);
        stroke(150,90,90);
        fill(150,100,100);
        textSize(30);
        //text("Score: "+score,640,780);
        keydown();
        //noStroke(0);
        fruit2.canv();
        raupi.canv();
    
        if (raupi.c <= fruit2.m+50 && raupi.c >= fruit2.m-50 && raupi.d <= fruit2.n+50&& raupi.d >= fruit2.n-50) {
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
            if (raupi.c >= 800 || raupi.c <= -50 || raupi.d <= 100 || raupi.d >= 800) {
                
                console.log("collision - 1 heart");
                image(careful, 280, 700, 230, 190);
                sc = 4;
            }}
    }

    //first game over screen
    if (lives == 0 && sc == 2) {
        background(0);
            image(gameOver1, 0, 0, 750, 790);

            if (mouseY >= 220 && mouseY <= 460 && mouseX >= 250 && mouseY <=610){
            image(gameOver2,0,0,750,790);
        }   if (mouseY >= 220 && mouseY <= 460 && mouseX >= 250 && mouseY <=610&&mouseIsPressed){
            sc = 1 ;
            snakeBody.length = 1;
            snekL =1;
            score=0;
            lives = 2;
            dir = null;
            snake = {
                x: 80,
                y: 180,
                canv: function () {
                    fill(200, 200, 200);
                    //ellipse(this.x, this.y, box, box);
                    for (var i = 0; i < snakeBody.length; i++) {
                        ellipse(snakeBody[i].x, snakeBody[i].y, box, box);
                    }
                }
            };
        }
    }
    if ( sc == 4 ) {
        background(0);
            image(gameOver1, 0, 0, 750, 790);

            if (mouseY >= 220 && mouseY <= 460 && mouseX >= 250 && mouseY <=610){
            image(gameOver2,0,0,750,790);
        }   if (mouseY >= 220 && mouseY <= 460 && mouseX >= 250 && mouseY <=610&&mouseIsPressed){
            sc = 3 ;
            raupiBody.length = 1;
            robL =1;
            score=0;
            dir = null;
            raupi = {
                c: 100,
                d: 190,
                canv: function () {
                    fill(200, 200, 200);
                    //ellipse(this.x, this.y, box, box);
                    for (var u = 0; u < raupiBody.length; u++) {
                        image(raupiIMG,raupiBody[u].c, raupiBody[u].d, bx, bx);
                    }
                }
            };
        }
    }

}
