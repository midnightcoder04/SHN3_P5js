let stars = [];
let showWelcome = true;
let startPage = true;
let travellingPage = false;
let content = false;
let blur = 0;
let blink = 0;
let blinkdir = 3;

let nodes = [];
let astro;
 
function setup() {
  cvx = windowWidth
  cvy = windowHeight
  numStars = int((cvx*cvy) / 5000);
  numNodes = int((cvx*cvy) / 2500);
  createCanvas(cvx, cvy);
  for(let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
  
  astro = new Astro(width/2,height/2);
  for(let i = 0; i < numNodes; i++)
    nodes.push(new Node(random(width),random(height)))
}

function draw() {
  background(0);
  //translate(width, height);
  
  //Stars being drawn
  if (startPage) {
    for(let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].show();
    }  
  }
  //messages on top
  if (showWelcome) {
    welcome();
  }
  if (travellingPage) {
    travelling();
  }
  if (content) {
    astro.update();
    astro.show();
    for(let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].show();
    }
  }
}

//welcome
function welcome() {
  if (blur < 240) {
    blur += 2;
  }
  fill(255,blur);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("Welcome",width/2, height/2 - 20)
  blink += blinkdir
  if(blink >= 255 || blink <= 0) {
    blinkdir *= -1
  }

  fill(255, blink);
  textSize(24);
  text("Click to continue",width / 2, height / 2 + 20);
}

//travel
function travelling() {
  fill(255,blink);
  textAlign(CENTER,CENTER);
  textSize(24);
  text("Travelling to spiderverse..", width/2, height/2);
  blink += blinkdir
  if(blink >= 255 || blink <= 0) {
    blinkdir *= -1
  }
}

//stars 
class Star {
  constructor() {
    this.x = random(width,width*2);
    this.y = random(height);
    this.z = random
    this.size = random(1,5);
    this.speed = random(1,3);
  }
  show() {
    fill(255);
    //noStroke();
    ellipse(this.x, this.y, this.size,this.size)
  }
  update() {
    this.x-= this.speed;
    if(this.x < -this.size) {
      this.x = random(width,width*2);
      this.y = random(height);
    }
  }
}

//alien_spider
class Node {
  
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.color = color(160,255,255,100);
    this.length = random(20,100);
    this.cpd = [random(50,200), random(50,200), random(50,200), random(50,200)];
    this.angle = 0;
  }
  
  show() {
    strokeWeight(3);
    stroke(this.color);
    point(this.x, this.y);
  }
  
  update() {
    let cpx = 1;
    let cpy = 1;
    this.angle++;
    if(this.x < astro.x) {
      cpx = -1;
    }
    if(this.y > astro.y) {
      cpy = -1;
    }
    
    if(dist(this.x,this.y,astro.x,astro.y) <= this.length){
      this.cl = color(70,210,250);
      strokeWeight(1.5);
      noFill()
      curve(this.x + this.cpd[0]*cpx, this.y + this.cpd[0]*cpy, this.x, this.y, astro.x, astro.y, astro.x + this.cpd[0]*cpx, astro.y + this.cpd[0]*cpy)
    }
    else {
      this.color = color(160,255,255,120);
    }
  }
}

//Alienhead
class Astro{
  constructor(x, y){
    this.x = x;
    this.y = y
    this.color = color(130,255,255);
    this.r = 10;
    this.hr = 60;
    this.vx = 0;
    this.vy = 0;
  }
  show() {
    fill(this.color)
    circle(this.x, this.y, this.r)
  }
  update(){
    this.x += this.vx;
    this.y += this.vy;
    this.vx = (mouseX - this.x) * 0.1;
    this.vy = (mouseY - this.y) * 0.1;
  }
}

//mouse...
function mousePressed() {
  if (!content) {
    showWelcome = false;
    travellingPage = true;
    setTimeout(() => {
      startPage = false;
      travellingPage = false;
      content = true;
    },5000);
  }
}