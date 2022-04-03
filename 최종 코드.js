var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;
var flySpeed = 0.1;

var terrain = [];
var slider;
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
  slider = createSlider(0, 360, 60, 40);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw() {
  let val = slider.value();
  push();
  strokeWeight(1);
  stroke(0);
  normalMaterial();
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
   
  //하늘색
  if (mouseY<310) background(60-mouseY/12,0,100-mouseY); 
  else background(0,0,mouseY/3-255);
  
  translate(0, 50);
  rotateX(PI / 3);
  fill(0,180, 0, 150);
  
  //빛
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(255, 255, 200, locX, locY, 50);
  
  //땅
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
  translate(mouseX+100,mouseY,20);
  beginShape();
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
  
  //하늘에 별 생성
  push();
  translate(-200,-200);
  star();
  translate(400,-30);
  star();
  translate(-50,60);
  star();
  pop();
  
  //달, slider를 이용하여 달 모양 바꾸기
  push();
  
  if (mouseY<=50){
    translate(0,-50,-50);
    fill(255-mouseY/4,255-mouseY/4,0);
  } else if (mouseY<=300){
    translate(0,mouseY/2-75,-50);
    fill(255-mouseY/4,255-mouseY/4,0);   
  }
  
  if (mouseY<=300) {
  translate(0,-275,-50);
  noStroke();
  ellipse(0,20,80,80);
  if (mouseY<310) fill(60-mouseY/12,0,100-mouseY); 
  else fill(0,0,mouseY/3-255);
  ellipse(slider.value()/4,20,80,80);
  }
  pop();
}

function keyPressed() {
  //방향키를 누름에 따라 속도가 달라짐
  if (keyCode === UP_ARROW) {
    flySpeed += 0.05;
  } else if (keyCode === DOWN_ARROW) {
    flySpeed -= 0.05;
  }
}

function star() {
  push();
  noStroke();
  rotate(frameCount/10+(mouseY-pmouseY)/10);
  beginShape();
  vertex(-10,10);
  vertex(0,35);
  vertex(10,10);
  vertex(35,0);
  vertex(10,-10);
  vertex(0,-35);
  vertex(-10,-10);
  vertex(-35,0);
  scale(0.5);
  endShape();
  pop();
}
