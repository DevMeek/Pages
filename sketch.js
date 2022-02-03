let playerX = 200;
let playerY = 200;
let speed = 1;
let spaceBetweenRays = 5;
let FOV = 60;
let renderDist = 40;
let dir = 0;
let lines = [];

function setup() {
  createCanvas(1200, 800);
  angleMode(DEGREES);
  noCursor();
  lines[0] = new LineClass(400, 400, 400, 200, 1, 0);
  lines[1] = new LineClass(400, 400, 200, 400, -1, 1);
  print(lines);
}

var hit = false;
var hit2 = false;

function draw() {
  background(0);
  fill(255);
  stroke(255);

  //Map

  //Keys
  for(let i = 0; i < lines.length; i++) {
    line(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2);
    hit2 = collideLineCircle(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2, playerX, playerY, 20);
    if (hit2) {
      playerX += lines[i].xool*abs(cos(dir));
      playerY += lines[i].yool*abs(sin(dir));
    }
    else {
      if (keyIsDown(87)) {
        playerY += speed * sin(dir);
        playerX += speed * cos(dir);
      }
      if (keyIsDown(83)) {
        playerY -= speed * sin(dir);
        playerX -= speed * cos(dir);
      }
      if (keyIsDown(65)) {
        playerY -= speed * cos(dir);
        playerX += speed * sin(dir);
      }
      if (keyIsDown(68)) {
        playerY += speed * cos(dir);
        playerX -= speed * sin(dir);
      }
    }
  }

  dir += movedX;

  circle(playerX, playerY, 20);
  for (let i = -FOV / 2; i < FOV; i += spaceBetweenRays) {
    let endX = playerX + renderDist * cos(dir + i);
    let endY = playerY + renderDist * sin(dir + i);
    hit = collideLineLine(playerX, playerY, endX, endY, 20, 20, 100, 50, true);
    if (hit.x != 0) {
      endX = hit.x;
      endY = hit.y;
    }
    line(playerX, playerY, endX, endY);

  }
}


class LineClass {
  constructor(x1, y1, x2, y2, xool, yool) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.xool = xool;
    this.yool = yool;
  }
}