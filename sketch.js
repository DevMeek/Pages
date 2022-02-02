let playerX = 200;
let playerY = 200;
let speed = 1;
let spaceBetweenRays = 5;
let FOV = 60;
let renderDist = 40;
let dir = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noCursor();
}

var hit = false;
var hit2 = false;

function draw() {
  background(0);
  fill(255);
  stroke(255);
  
  //Map
  line(20,20,100,50);
  
  //Keys
  hit2 = collideLineCircle(20, 20, 100, 50, playerX, playerY, 20);
  if(true) {
      if(hit2 === false) {
        if(keyIsDown(87)) {
            playerY += speed*sin(dir);
            playerX += speed*cos(dir);
        }
        if(keyIsDown(83)) {
            playerY -= speed*sin(dir);
            playerX -= speed*cos(dir);
        }
        if(keyIsDown(65)) {
          playerY -= speed*cos(dir);
          playerX += speed*sin(dir);
        }
        if(keyIsDown(68)) {
          playerY += speed*cos(dir);
          playerX -= speed*sin(dir);
        }
    }
  }
     
  
  
  
  dir += movedX;
  
  circle(playerX, playerY, 20);
  for(let i = -FOV/2; i < FOV; i+= spaceBetweenRays) {
      let endX = playerX + renderDist*cos(dir+i);
      let endY = playerY + renderDist*sin(dir+i);
      hit = collideLineLine(playerX, playerY, endX, endY, 20, 20, 100, 50, true);
      if(hit.x != 0) {
        endX = hit.x;
        endY = hit.y;
      }
      line(playerX, playerY, endX, endY);
    
    }
}