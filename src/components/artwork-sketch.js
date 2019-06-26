import p5 from "p5";

export default function artworkSketch(s) {
  let playing = 1;

  let shape;
  let joints = 6;
  let lineLength = window.innerHeight * 0.05;
  let speedRelation = ~~s.random(2, 8);
  let speedRelationInit = speedRelation;
  let center;
  let pendulumPath;
  let angle = 0;
  let maxAngle = 360;
  let speed;
  let speedFactor = 1;
  let deltaSpeed = 0;
  let deltaSpeedDeriv = 0
  let deviation;
  // let hue = new Array(joints).fill(() => s.random(0, 360));
  let level = 1;
  let speedDistortion = 0.0;
  let frame = 0;
  let frameSkip = 1;

  let showPendulum = true;
  let showPendulumPath = true;
  let width = window.innerHeight * 0.3;
  let height = window.innerHeight * 0.3;

  pendulumPath = [];

  // new empty array for each joint
  for (var i = 0; i < joints; i++) {
    pendulumPath.push([]);
  }

  s.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    playing = props.playing ? 1 : 0;
  };

  s.setup = () => {
    s.frameRate(60)
    s.createCanvas(width, height);
    s.colorMode(s.HSB, 360, 100, 100, 100);
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

    angle = 0;
    speed = (2 * 8) / s.pow(1.75, joints - 1) / s.pow(2, speedRelation - 1);
  };

  s.draw = () => {
    frame = (frame + 1) % frameSkip;
    // s.background(240, 240, 240);
    // console.log(speedRelation, ~~s.random(2, 8));
    let k = 100-speedDistortion
    deltaSpeedDeriv += (s.random() - 0.5) * speedDistortion; // deltaSpeed // (1 - speedDistortion / 2) +
    deltaSpeed += deltaSpeedDeriv
    deltaSpeed -= deltaSpeed / 4;
    speedRelation += deltaSpeed;
    speedRelation -= (speedRelation - speedRelationInit) / 1.1;
    // console.log(speedRelation);

    angle += speed * speedFactor * playing; //* (1-(4/2) + 4 * Math.random());

    deviation = speedRelation / speedRelationInit;

    // each frame, create new positions for each joint
    if (angle <= maxAngle + speed) {
      // start at the center position
      var pos = center.copy();
      //console.log(Math.random());

      //pos.mult(1, ~~(32*(Math.random() * 0.2 + 0.9))/32);
      // pos.mult(2, ~~(32*(Math.random() * 0.2 + 0.9))/32)

      let coarseness = 0.1;
      for (var i = 0; i < joints; i++) {
        var a =
          ~~(angle * s.pow(speedRelation, i) * (1 / coarseness)) /
          (1 / coarseness); //~~
        if (i % 2 == 1) a = -a;
        var nextPos = p5.Vector.fromAngle(s.radians(a));
        nextPos.setMag(
          ((joints - i) / joints) * lineLength * deviation * deviation
        );
        nextPos.add(pos);

        if (showPendulum && i == level && frame == 0 && playing) {
          //&& level == 2 && level <= 3
          s.noStroke();
          s.fill(255, 10);
          //s.ellipse(pos.x, pos.y, 4, 4);
          s.noFill();
          s.strokeWeight(0.9);
          s.stroke(255, 10 * (frameSkip + 1));
          s.line(pos.x, pos.y, nextPos.x, nextPos.y);
        }

        if (i == level) pendulumPath[i].push(nextPos);
        pos = nextPos;
      }
    } else {
      level += 1;
      angle = 0;
      console.log("next level");
    }
    // draw the path for each joint
    if (showPendulumPath && frame % (frameSkip / 2) == 0) {
      s.strokeWeight(1);
      for (var i = pendulumPath.length - 3; i < pendulumPath.length; i++) {
        if (i < 0) i = 0;
        var path = pendulumPath[i];

        s.beginShape();
        var hue = ((360 / joints) * i) / 3;
        s.stroke(hue, 80, 60, 50);
        s.strokeWeight(0.1 * Math.pow(Math.abs(deviation), 4));
        for (var j = 0; j < path.length; j++) {
          // s.vertex(path[j].x, path[j].y);
        }
        s.endShape();
      }
    }
  };

  s.keyPressed = () => {
    // console.log(s.key);
    let dDistortion = 0.1;
    let dSpeed = 0.1;
    switch (s.key) {
      case "PageUp":
        if (speedDistortion < 0.1) speedDistortion += dDistortion;
        break;
      case "PageDown":
        speedDistortion -= dDistortion;
        if (speedDistortion < 0) speedDistortion = 0;
        break;
      case "Home":
        if (frameSkip < 100) frameSkip += 1;
        break;
      case "End":
        if (frameSkip > 1) frameSkip -= 1;
        break;
      case "+":
        if (speedFactor < 100) speedFactor += dSpeed;
        break;
      case "-":
        if (speedFactor > 0) speedFactor -= dSpeed;
        break;
      default:
        return false;
    }
    // console.log(speedDistortion, frameSkip);
  };
}
