let symbols = "¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ“‘«åß∂˙∆˚¬…æΩ≈ç√∫µ≤≥÷˜";

let storedSymbols = [];

let x1 = 0; // x position of the first rectangle
let rectSpeed = 25; // speed of the rectangles
let symbolAcceleration = 1;

function setup() {
  createCanvas(900, 900);
  noStroke();
}

function draw() {

  // begin capturer
  if (frameCount === 1){
    capturer.start();
  }

  // create a row of symbols, and add them to the storage array
  for (let i = 0; i < 60; i++){
    let r = random(0,10);
    if (r > 8){
      let symb = new SymbolItem(i*15);
      storedSymbols.push(symb);
    };
  }

  storedSymbols = storedSymbols.filter(symb => symb.tooLow == false);

  // create background
  background(0);

  // iterate over the symbol storage array and display, then update them
  for (let symb of storedSymbols){
    symb.display();
    symb.update();
  }

  // initialize foreground text parameters
  fill(255);
  textSize(28);
  textFont("Courier New");
  textAlign(CENTER, CENTER);
  let textY = 0;

  // create rectangle which animates on position x1
  rect(x1, 200, 10, 450);

  // create lines f text which glitch back and forth with a random(-1,1)
  for (let textY = 0; textY < height; textY += 20){
    text("console.log(whateverTheFuckItIs)", width / 2 + random(-1,1), textY);
  }

  // change direction when the rectangles reach the edge of the canvas
  if (x1 > width || x1 < 0) {
    rectSpeed *= -1;
  }

  // update the position of the rectangles
  x1 += rectSpeed;

  // end capturer based on frameCount
  if (frameCount < 901) {
    capturer.capture(canvas);
  } else if (frameCount === 901) {
    capturer.save();
    capturer.stop();
  }
}

// SymblItem class which takes a random element from the symbols string above, beginning at the top of the canvas
class SymbolItem {
  constructor(x) {
    this.text = symbols[Math.floor((Math.random(0,1)*symbols.length))];
    this.symbolSpeed = 2 + Math.floor(Math.random(0,1)*5);
    this.x = x;
    this.y = 0;
    this.tooLow = false;
  }

  update() {
    this.speed += symbolAcceleration;
    this.y += this.symbolSpeed;

    if (this.y > height) this.tooLow = true;
  }

  // Display the symbol
  display() {
    fill(7, 252, 3);
    textSize(15);
    text(this.text, this.x, this.y);
  }
}
