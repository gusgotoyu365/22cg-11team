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
  //  colorMode(HSB);
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
  
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(255, 255, 255, locX, locY, 50);
  
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
  //mouseY
  push();
  translate(0,-270,0);
  push();
  rotateY(6);
  rotateZ(4);
  beginShape();
  vertex(-120,60);
  vertex(-110,80);
  vertex(-100,60);
  vertex(-85,50);
  vertex(-100,42);
  vertex(-110,25);
  vertex(-120,42);
  vertex(-135,50);
  endShape();
  pop();
  push();
  rotateY(3);
  rotateZ(95);
  beginShape();
  vertex(130,40);
  vertex(140,55);
  vertex(150,40);
  vertex(165,30);
  vertex(150,22);
  vertex(140,5);
  vertex(130,22);
  vertex(115,30);
  endShape();
  pop();
  beginShape();
  vertex(240,90);
  vertex(250,115);
  vertex(260,90);
  vertex(285,80);
  vertex(260,72);
  vertex(250,45);
  vertex(240,72);
  vertex(215,80);
  endShape();
  push();
  rotate(-31);
  beginShape();
  vertex(-220,110);
  vertex(-210,125);
  vertex(-200,110);
  vertex(-185,100);
  vertex(-200,92);
  vertex(-210,75);
  vertex(-220,92);
  vertex(-235,100);
  endShape();
  pop();
  beginShape();
  vertex(-170,80);
  vertex(-160,115);
  vertex(-150,80);
  vertex(-125,70);
  vertex(-150,62);
  vertex(-160,35);
  vertex(-170,62);
  vertex(-195,70);
  endShape();
  push();
  rotate(47);
  rotateY(9);
  beginShape();
  vertex(290,40);
  vertex(300,55);
  vertex(310,40);
  vertex(325,30);
  vertex(310,22);
  vertex(300,5);
  vertex(290,22);
  vertex(275,30);
  endShape();
  pop();
  pop();

  
  //slider 달 모양 바꾸기
  translate(0,-275,-50);
  noStroke();
  if (mouseY<310) fill(60-mouseY/12,0,100-mouseY); 
  else fill(0,0,mouseY/3-255);
  ellipse(slider.value()/4,45,80,80);
  pop();
  
  translate(0,-275,-50);
  noStroke();
  fill(230,230,180);
  ellipse(0,300,80,80);
 
}




function keyPressed() {
  //방향키를 누름에 따라 속도가 달라짐
  if (keyCode === UP_ARROW) {
    flySpeed += 0.05;
  } else if (keyCode === DOWN_ARROW) {
    flySpeed -= 0.05;
  }
}
