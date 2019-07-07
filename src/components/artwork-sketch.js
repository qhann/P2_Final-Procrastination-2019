import p5 from "p5";

export default function artworkSketch(s) {
  let playing = 1;
  let width = 400 //window.innerHeight * 0.3;
  let height = 400 //window.innerHeight * 0.3;

  let shape;
  let joints = 4;
  let lineLength = height * 0.3;
  let speedRelation = 5 //~~s.random(3, 7);
  let speedRelationInit = speedRelation;
  let center;
  let pendulumPath;
  let angle = 0;
  let maxAngle = 360;
  let speed;
  let speedFactor = 1;
  let deltaSpeed = 0;
  let deltaSpeedDeriv = 0;
  let deviation;
  let lessCorrect = 4;
  let opacity;
  let color;
  // let hue = new Array(joints).fill(() => s.random(0, 360));
  let level = 1;
  let speedDistortion = 0;
  let frame = 0;
  let frameSkip = 1;
  let exhaustion = 0;
  let health = 100;

  let showPendulum = true;
  let showPendulumPath = true;

  pendulumPath = [];

  // new empty array for each joint
  for (var i = 0; i < joints; i++) {
    pendulumPath.push([]);
  }

  s.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    playing = props.playing ? 1 : 0;
    
    exhaustion = (props.vitalStats.exhaustion - 50)*2 * ((100-props.vitalStats.coffee)/100);
    exhaustion = exhaustion < 1 ? 1 : exhaustion
    health = props.vitalStats.health;
    speedDistortion = (exhaustion * exhaustion) / 30000;
    frameSkip = ~~(exhaustion / 10) + 1; //* (~~((100-health)/10))+1
    speedFactor = 2 //(6 / exhaustion) * frameSkip;
    // console.log(frameSkip)
  };

  s.setup = () => {
    s.frameRate(60);
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
    let k = 100 - speedDistortion;
    deltaSpeed += (s.random() - 0.5) * speedDistortion; // deltaSpeed // (1 - speedDistortion / 2) +
    // deltaSpeed += deltaSpeedDeriv
    deltaSpeed -= deltaSpeed / 4;
    speedRelation += deltaSpeed;
    speedRelation -= (speedRelation - speedRelationInit) / lessCorrect;
    // console.log(speedRelation);

    angle += speed * speedFactor * playing; //* (1-(4/2) + 4 * Math.random());

    deviation = Math.abs(speedRelation / speedRelationInit - 1);

    // each frame, create new positions for each joint
    if (angle <= maxAngle + speed) {
      // start at the center position
      var pos = center.copy();
      // console.log(exhaustion);

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
          ((joints - i) / joints) * lineLength * (deviation + 1 * deviation + 1) * 0.5
        );
        nextPos.add(pos);

        if (showPendulum && i == level && frame == 0 && playing) {
          //&& level == 2 && level <= 3
          s.noStroke();
          s.fill(255, 10);
          //s.ellipse(pos.x, pos.y, 4, 4);

          opacity = (255 * frameSkip) / 5;
          color = angle || 1; //Math.abs(180 - ((angle * (speedRelation+1)) % 360))
          s.noFill();
          s.strokeWeight(2);
          s.colorMode(s.HSB, 360, 100, health, 255);
          s.stroke(color || 1 , 100 - exhaustion, health * 500, opacity);
          s.line(
            pos.x + (100 * deviation) / i,
            pos.y + (100 * deviation) / i,
            nextPos.x - (200 * deviation) / i,
            nextPos.y - (200 * deviation) / i
          );
        }

        if (i == level) pendulumPath[i].push(nextPos);
        pos = nextPos;
        
      }
    } else {
      speedFactor = speedFactor * level / (level*2 + 1)
      level += 1;
      angle = 0;
      console.log("next level");
    }
    // draw the path for each joint
    if (showPendulumPath) {
      s.strokeWeight(1);
      for (var i = 0; i < pendulumPath.length; i++) {
        if (i < 0) i = 0;
        var path = pendulumPath[i];

        s.beginShape();
        s.colorMode(s.HSB, 100, 100, 100, 255);
        var hue = ((360 / joints) * i) / 3;
        s.stroke(color || 1, 100, 100, 1);
        s.strokeWeight((100-exhaustion)/100);
        for (var j = 0; j < path.length; j++) {
          if (pos) s.vertex(pos.x, pos.y);
        }
        s.endShape();
      }
    }
  };

  s.keyPressed = () => {
    // console.log(s.key);
    // console.log(speedDistortion, frameSkip);
    let dDistortion = 0.02;
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
  };
}
