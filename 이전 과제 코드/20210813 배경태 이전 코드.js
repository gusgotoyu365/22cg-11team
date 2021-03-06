var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;
var flySpeed = 0.1;

var terrain = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
  push();
  strokeWeight(1);
  stroke(0);
  
  flying -= flySpeed;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
   
  //배경 색깔 바뀌는거
  if (mouseY<290) background(255/2-mouseY/3,0,0);
  else if (mouseY>=290&&mouseY<=310) background(0,0,0);
  else background(0,0,mouseY/3-255/4);
  translate(0, 50);
  rotateX(PI / 3);
  fill(0,180, 0, 150);
  
  //기본적인 움직이는 땅 코드
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  
  //커서에 따라 움직이는거
  var cursorSize=50;
  var cursorHeight=100;
  
  //비행기 생성, 도형이 기울어지게
  translate(mouseX+100,mouseY);
  beginShape(WEBGL);
  stroke(255);
  strokeWeight(cursorSize/10);
  fill(255);
  vertex(mouseX,mouseY-cursorSize,cursorHeight);
  if (mouseX>310) vertex(mouseX+cursorSize,mouseY+cursorSize,cursorHeight+(mouseX-300)/2);
  else if (mouseX>=290 && mouseX <=310) vertex(mouseX+cursorSize,mouseY+cursorSize,cursorHeight);
  else vertex(mouseX+cursorSize,mouseY+cursorSize,cursorHeight-(300-mouseX)/2);
  vertex(mouseX,mouseY+cursorSize/2,cursorHeight);
  if (mouseX<290) vertex(mouseX-cursorSize,mouseY+cursorSize,cursorHeight-(mouseX-300)/2);
  else if (mouseX>=290 && mouseX<=310) vertex(mouseX-cursorSize,mouseY+cursorSize,cursorHeight);
  else vertex(mouseX-cursorSize,mouseY+cursorSize,cursorHeight-(mouseX-300)/2);
  endShape(CLOSE);
  pop();

  //mouseY에 따라 낮&밤 변경
  if (mouseY<290) {
    translate(0,-200-mouseY);
    fill(255,0,0);
  }
  else if (mouseY>310&&mouseY<600) {
    translate(0,-200-430+mouseY/1.4);
    fill(255,255,0);
  }
  else if (mouseY>=600) {
    translate(0,-200-430+600/1.4);
    fill(255,255,0);
  }
  else {
    translate(0,-400);
    fill(255);
  }
  noStroke();
  sphere(20);
  
}

function keyPressed() {
  //방향키를 누름에 따라 속도가 달라짐
  if (keyCode === UP_ARROW) {
    flySpeed += 0.05;
  } else if (keyCode === DOWN_ARROW) {
    flySpeed -= 0.05;
  }
}
