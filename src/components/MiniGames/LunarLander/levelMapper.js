createCanvas(1500, 1500);

var map = loadImage("lvl1_bg.jpg");
var landline = [];
var view = {
  width: 1500,
  height: 1500
};
function mousePressed() {
  console.log(landline);
  percentX = (mouseX - 2) / view.width;
  percentY = (mouseY - 4) / view.height;
  landline.push([percentX, percentY]);
}

function keyPressed() {
  if (keyCode == 8) {
    landline.pop();
  }

  //console.log(keyCode);
}

function draw() {
  image(map, 0, 0, view.width, view.height);
  for (i = 0; i < landline.length; i++) {
    var dot = landline[i];
    var prevDot = i > 0 ? landline[i - 1] : dot;
    fill(255, 255, 255);
    rect(dot[0] * view.width, dot[1] * view.height, 2, 2);
    line(
      prevDot[0] * view.width,
      prevDot[1] * view.height,
      dot[0] * view.width,
      dot[1] * view.height
    );
  }
}
