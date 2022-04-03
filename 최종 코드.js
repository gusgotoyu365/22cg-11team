let cols, rows;
let scl = 20;
let w = 1400;
let h = 1000;

let flying = 0;
let flySpeed = 0.1;
let flightState = 1;
let cameraNum = 0;

let terrain = [];
let slider;

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
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    var xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
   
  //하늘 색
  if (mouseY<310) {
    background(60-mouseY/12,0,100-mouseY); 
  } else {
    background(0,0,mouseY/3-255);
  }
  
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
  
  let cursorSize=50;
  let cursorHeight=100;
  translate(mouseX+100,mouseY,20); //커서에 따라 움직이는거
  fill(255);
  if (flightState == 1) { //키가 1 or 2이면 모양 바꾸기
    flight1(cursorSize, cursorHeight);
  } else if (flightState == 2) {
    flight2(cursorSize, cursorHeight);
  }  
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
  if (mouseY<=50){ //달이 너무 높으면 위치 고정
    translate(0,-50,-50);
    fill(255-mouseY/4,255-mouseY/4,0);
  } else if (mouseY<=300){ //달이 마우스 좌표에 따라 움직임
    translate(0,mouseY/2-75,-50);
    fill(255-mouseY/4,255-mouseY/4,0);   
  }
  
  if (mouseY<=300) { //중간을 기준으로 위쪽에 있을때부터 달 생성
    translate(0,-275,-50);
    noStroke();
    translate(0,0,-1);
    ellipse(0,20,80,80);
    if (mouseY<310) {
      fill(60-mouseY/12,0,100-mouseY);
    } else {
      fill(0,0,mouseY/3-255);
    }
    translate(0,0,1);
    ellipse(slider.value()/4,20,80,80);
  }
  pop();

  //카메라 시점 바꾸기
  if (cameraNum == 0) {
    camera(0,0,536,0,0,0);
  } else if (cameraNum == 1) {
    camera(606,81,644,0,16,-28);
  } else if (cameraNum == 2) {
    camera(-6,-94,567,-6,-334,0);
  }
}

function keyPressed() {
  //상하 방향키를 누름에 따라 속도가 달라짐
  if (keyCode === UP_ARROW) {
    flySpeed += 0.05;
  } else if (keyCode === DOWN_ARROW) {
    flySpeed -= 0.05;
  }

  //좌우 방향키를 누름에 따라 카메라가 달라짐
  if (keyCode === LEFT_ARROW) {
    if (cameraNum == 0) {
      cameraNum = 2;
    } else {
      cameraNum = cameraNum - 1;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (cameraNum == 2) {
      cameraNum = 0;
    } else {
      cameraNum = cameraNum + 1;
    }
  }
}

function keyTyped() {
  if (key === '1') {
    flightState = 1;
  } else if (key === '2') {
    flightState = 2;
  }
}

function star() { //별 생성 함수
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

function flight1(cursorSize, cursorHeight) {
  beginShape();
  stroke(255);
  strokeWeight(cursorSize/20);
  vertex(mouseX,mouseY-cursorSize,cursorHeight);
  if (mouseX>310) vertex(mouseX+cursorSize,mouseY+cursorSize,cursorHeight+(mouseX-300)/2);
  else if (mouseX>=290 && mouseX <=310) vertex(mouseX+cursorSize,mouseY+cursorSize,cursorHeight);
  else vertex(mouseX+cursorSize,mouseY+cursorSize,cursorHeight-(300-mouseX)/2);
  vertex(mouseX,mouseY+cursorSize/2,cursorHeight);
  if (mouseX<290) vertex(mouseX-cursorSize,mouseY+cursorSize,cursorHeight-(mouseX-300)/2);
  else if (mouseX>=290 && mouseX<=310) vertex(mouseX-cursorSize,mouseY+cursorSize,cursorHeight);
  else vertex(mouseX-cursorSize,mouseY+cursorSize,cursorHeight-(mouseX-300)/2);
  endShape(CLOSE);
}

function flight2(cursorSize, cursorHeight) {
  beginShape();
  stroke(255);
  strokeWeight(cursorSize/20);
  vertex(mouseX,mouseY-cursorSize,cursorHeight);
  if (mouseX>310) vertex(mouseX+cursorSize,mouseY+cursorSize,cursorHeight+(mouseX-300)/2);
  else if (mouseX>=290 && mouseX <=310) vertex(mouseX+cursorSize,mouseY+cursorSize,cursorHeight);
  else vertex(mouseX+cursorSize,mouseY+cursorSize,cursorHeight-(300-mouseX)/2);
  if (mouseX<290) vertex(mouseX-cursorSize,mouseY+cursorSize,cursorHeight-(mouseX-300)/2);
  else if (mouseX>=290 && mouseX<=310) vertex(mouseX-cursorSize,mouseY+cursorSize,cursorHeight);
  else vertex(mouseX-cursorSize,mouseY+cursorSize,cursorHeight-(mouseX-300)/2);
  endShape(CLOSE);
}