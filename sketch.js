xBall = 300
yBall = 200
dBall = 25
rBall = dBall / 2
xRacket_1 = 0
xRacket_2= 590
yRacket_1 = 165
yRacket_2 = 165
wRacket = 10
hRacket = 100
velocityXBall = 5
velocityYBall = 5
myPoints = 0
enemyPoints = 0
let chanceMistake = 0
let soundtrack; 
let racketed;;
let scoring;
    

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  
  background(0);
  
  showBall();
  
  moveBall();
  
  showRacket_1();
  
  showRacket_2();
  
  borderBall();
  
  moveRacket_1();
  
  moveRacket_2();
  
  racketHitBall(xRacket_1, yRacket_1, 'left');
  
  racketHitBall(xRacket_2, yRacket_2, 'right');
  
  points();
  
  scoreboard();
  
  
  
}

function showBall(){
  circle(xBall,yBall,dBall);
  }

function showRacket_1(){
  rect(xRacket_1,yRacket_1,wRacket,hRacket);
}

function showRacket_2(){
  rect(xRacket_2, yRacket_2,wRacket,hRacket);
}

function moveBall(){
  xBall += velocityXBall;
  yBall += velocityYBall;
  }

function moveRacket_1(){
  if (keyIsDown(UP_ARROW)){
    yRacket_1 -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
   yRacket_1 += 10;
  }
// Moviment restriction Racket_1
  yRacket_1 = constrain(yRacket_1, 0,  height - hRacket)
}

function moveRacket_2(){  
  
  velocityYEnemy = yBall - (yRacket_2 + hRacket/2);
  
  calculateChanceMistake();
  
  print('The value of chanceMistake is ' + chanceMistake);
  
  yRacket_2 += velocityYEnemy + chanceMistake;
  
// Moviment restriction Racket_2
  yRacket_2 = constrain(yRacket_2, 0,  height - hRacket);
}

function borderBall(){
  if (xBall + rBall > width || xBall - rBall < 0){
    velocityXBall *= -1;
  }
  if (yBall + rBall > height || yBall - rBall < 0){
    velocityYBall *= -1;
  }
}

function racketHitBall(x, y, v){
  if(collideRectCircle(x, y, wRacket, hRacket, xBall, yBall, dBall)){
    if (v === 'left' && velocityXBall < 0) {
      velocityXBall *= -1;
      racketed.play();
    }
    if (v === 'right' && velocityXBall > 0) {
      velocityXBall *= -1;
      racketed.play();
    }    
  }
}

function scoreboard(){
  
  stroke(255);
  fill(255, 140, 0);
  rect(width/2 - 190, 0, 60, 32)
  rect(width/2 + 130, 0, 60, 32)
  
  
  textAlign(CENTER);
  fill(255);
  textSize(24);

  text(myPoints, width/2 - 160, 24);
  text(enemyPoints, width/2 + 160, 24);
}

function points(){
  if (xBall + rBall > width){
    myPoints++;
    scoring.play();
  }  
  if (xBall - rBall < 0){
    enemyPoints++;
    scoring.play();
  }
}

function calculateChanceMistake() {
  //chanceMistake
  if (enemyPoints >= myPoints) {
    chanceMistake += 1;
  } else {
    chanceMistake -= 1;
  }
  //Restriction
  chanceMistake = constrain(chanceMistake, 35, 80);
}

function preload(){
  soundtrack = loadSound("trilha.mp3");
  racketed= loadSound("raquetada.mp3");
  scoring = loadSound("ponto.mp3");
}

 


  









