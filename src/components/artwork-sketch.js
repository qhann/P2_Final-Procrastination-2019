import p5 from "p5";

export default function artworkSketch(s) {
  let shape;
  let joints = 5;
  let lineLength = 90;
  let speedRelation = ~~(20*s.random(2,6))/20;
  let center;
  let pendulumPath;
  let angle = 0;
  let maxAngle = 360;
  let speed;
  let hue = new Array(joints).fill(()=> s.random(0,360))

  let showPendulum = true;
  let showPendulumPath = true;
  let width = 600;
  let height = 600;

  pendulumPath = [];

  // new empty array for each joint
  for (var i = 0; i < joints; i++) {
    pendulumPath.push([]);
  }

  s.setup = () => {
    s.createCanvas(width, height);
    s.colorMode("HSB", 360, 100, 100, 100);
    s.noFill();
    s.strokeWeight(1);

    center = s.createVector(width / 2, height / 2);
    s.startDrawing();
  };

  s.startDrawing = () => {
    pendulumPath = [];
    // new empty array for each joint
    for (var i = 0; i < joints; i++) {
      pendulumPath.push([]);
    }

    angle = -90;
    speed = 8 / s.pow(1.75, joints - 1) / s.pow(2, speedRelation - 1);
  };

  s.draw = () => {
    // s.background(240, 240, 240);

    angle += speed;

    // each frame, create new positions for each joint
    for (let level = 0; level < 4; level++) {
      if (angle <= maxAngle + speed) {
        // start at the center position
        var pos = center.copy();

        for (var i = 0; i < joints; i++) {
          var a = angle * s.pow(speedRelation, i);
          if (i % 2 == 1) a = -a;
          var nextPos = p5.Vector.fromAngle(s.radians(a));
          nextPos.setMag(((joints - i) / joints) * lineLength);
          nextPos.add(pos);

          if (showPendulum && i >= 2 && level >= 2) {
            s.noStroke();
            s.fill(255, 10);
            s.ellipse(pos.x, pos.y, 4, 4);
            s.noFill();
            s.stroke(255, 10);
            s.line(pos.x, pos.y, nextPos.x, nextPos.y);
          }

          pendulumPath[i].push(nextPos);
          pos = nextPos;
        }
      }

      // draw the path for each joint
    if (showPendulumPath) {
        s.strokeWeight(1);
        for (var i = 0; i < pendulumPath.length; i++) {
          var path = pendulumPath[i];
  
          s.beginShape();
          // var hue = 360/joints*i/3;
          s.stroke(hue[i], 80, 60, 50);
          for (var j = 0; j < path.length; j++) {
              s.vertex(path[j].x, path[j].y);
          }
          s.endShape();
        }
      }
    }

    
  };
}
