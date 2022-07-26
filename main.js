let mouseDown = false

let slider = document.getElementById('slider');
let selector = document.getElementById('selector');
let selectValue = document.getElementById('selectValue');
let progressBar = document.getElementById('progress-bar');
let gridSize = document.querySelector('.gridSize');
let clearGrid = document.querySelector("#clearGrid");
let gridLines = document.querySelector('.gridLines');
let board = document.querySelector(".board");
let pcrButton = document.querySelector('pcr-button');
let eraser = document.querySelector('#eraser-btn');
let pastel = document.querySelector('#pastel');
let lighter = document.querySelector("#lighten-btn");
let shader = document.querySelector("#shader-btn");



// selectValue.textContent = slider.value

function rangeSlider(value) {
  progressBar.style.width = (value / 100) * 100 + '%';
  gridSize.textContent=`Grid Size: ${value} x ${value}`;
}

function rangeSliderValue(value) {
  progressBar.style.width = (value / 100) * 100 + "%";
}


// slider.oninput = function() {
//   selectValue.textContent = this.value
//   selector.style.left = this.value + '%'
//   progressBar.style.width = this.value + '%'
//   // gridSize.textContent = this.value
//   gridSize.textContent=`Grid Size: ${this.value} x ${this.value}`
  
//   eraser.classList.remove('active');
//   lighter.classList.remove('active');
//   shader.classList.remove('active');

// }

slider.onmouseup = function() {
  newSize = +this.value
  changeSize(newSize)
  pickr2.setColor(defaultBgColor);

  eraser.classList.remove('active');
  lighter.classList.remove('active');
  shader.classList.remove('active');
  pastel.classList.remove('active');

}


document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function populateBoard(size) { 

  squares = board.querySelectorAll('div');
  squares.forEach((div) => (div.remove()));
  board.style.gridTemplateColumns =  `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows =  `repeat(${size}, 1fr)`;  
                     
  let amount = size * size;
  for (let i = 0; i < amount; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = 'rgba(255,255,255,1)';
    square.addEventListener('mousedown', changeColour)
    square.addEventListener('mouseover', changeColour)
    board.appendChild(square);
    
  }
  
}

gridLines.addEventListener('click', () => {
  board.classList.toggle('gridToggle');
})

clearGrid.onclick = () => {
  changeSize(slider.value);
  pickr2.setColor(defaultBgColor);

  // eraser.classList.remove('active');
  // lighter.classList.remove('active');
  // shader.classList.remove('active');
  
};

// Use Pickr Library for creating colour picker

const pickr = Pickr.create({
  el: '.color-picker',
  theme: 'classic', // or 'monolith', or 'nano'
  default: 'rgba(0, 0, 0, 1)',

  swatches: [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 0.95)',
      'rgba(156, 39, 176, 0.9)',
      'rgba(103, 58, 183, 0.85)',
      'rgba(63, 81, 181, 0.8)',
      'rgba(33, 150, 243, 0.75)',
      'rgba(3, 169, 244, 0.7)',
      'rgba(0, 188, 212, 0.7)',
      'rgba(0, 150, 136, 0.75)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(139, 195, 74, 0.85)',
      'rgba(205, 220, 57, 0.9)',
      'rgba(255, 235, 59, 0.95)',
      'rgba(255, 193, 7, 1)'
  ],

  components: {

      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
          hex: true,
          rgba: true,
          input: true,
      }
  }
});

const pickr2 = Pickr.create({
  el: '.color-picker2',
  theme: 'classic', // or 'monolith', or 'nano'
  default: 'rgba(255,255,255,1)',
  

  swatches: [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 0.95)',
      'rgba(156, 39, 176, 0.9)',
      'rgba(103, 58, 183, 0.85)',
      'rgba(63, 81, 181, 0.8)',
      'rgba(33, 150, 243, 0.75)',
      'rgba(3, 169, 244, 0.7)',
      'rgba(0, 188, 212, 0.7)',
      'rgba(0, 150, 136, 0.75)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(139, 195, 74, 0.85)',
      'rgba(205, 220, 57, 0.9)',
      'rgba(255, 235, 59, 0.95)',
      'rgba(255, 193, 7, 1)'
  ],

  components: {

      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
          hex: true,
          rgba: true,
          input: true,
      }
  }
});

// Make Chosen Pen Colour Functional

let userColour = 'rgba(0, 0, 0, 1)'
let defaultBgColor = 'white'


function changeColour(e) {

  if (e.type === 'mouseover' && !mouseDown) return
  
  else {

    if (eraser.classList.contains('active')) {
      userColour = pickr2.getColor().toRGBA()
      e.target.style.backgroundColor = userColour;

    } else if (lighter.classList.contains('active')) {

      selectedColour = e.target.style.backgroundColor;
      let rgbaVal = lightenColour(selectedColour);
      rgbaValString = `rgba(${rgbaVal.toString()})`;
      e.target.style.backgroundColor = rgbaValString;

    } else if (shader.classList.contains('active')) {

      selectedColour = e.target.style.backgroundColor;
      let rgbaVal = shadeColour(selectedColour);
      rgbaValString = `rgba(${rgbaVal.toString()})`;
      e.target.style.backgroundColor = rgbaValString;
    
    } else if (pastel.classList.contains('active')) {

      RgbaPastelString = RandomPastelColour();
      e.target.style.backgroundColor = RgbaPastelString;
    
    } else {
      userColour = pickr.getColor().toRGBA();
      e.target.style.backgroundColor = userColour;
    }
      
     
  }
}


function RandomPastelColour () {
  
  let LightSalmonPink = 'rgba(255,154,162, 1)'
  let Melon = 'rgba(255, 183, 178, 1)'
  let VeryPaleOrange = 'rgba(255, 218, 193, 1)'
  let DirtyWhite = 'rgba(226, 240, 203, 1)'
  let MagicMint = 'rgba(181, 234, 215, 1)'
  let CrayolasPeriwinkle = 'rgba(199, 206, 234, 1)'
  
  let LightBlueish = 'rgba(204,241,255,1)';
  let Purpleish = 'rgba(224,215,255,1)';
  let Pinkish = 'rgba(255,204,225,1)';
  let BabyBlueish = 'rgba(215,238,255,1)';
  let Yellowish = 'rgba(250,255,199,1)';

  let pastelColours = [];
  pastelColours.push(LightSalmonPink, Melon, VeryPaleOrange, 
          DirtyWhite, MagicMint, CrayolasPeriwinkle, 
          LightBlueish, Purpleish, Pinkish,BabyBlueish, Yellowish)
  
  randomInt = Math.floor(Math.random() * pastelColours.length)

  return pastelColours[randomInt];
}

// Make Chosen Background Colour Functional

let currentBgColor = defaultBgColor;

pickr2.on('change', (color) => {
  bgColor = color.toRGBA().toString();
  currentBgColor = bgColor;
  changeBgColor(bgColor)
  if (pickr2.isOpen()) {
    eraser.classList.remove('active');
    lighter.classList.remove('active');
    shader.classList.remove('active');
  }
})

function changeBgColor(input) {
  let squares = document.querySelectorAll('.square');

  for (let i = 0; i < squares.length; i++) {
    let currentSquare = squares[i];
    currentSquare.style.backgroundColor = input;
    pickr2.applyColor(true) // Does the same functionality as 'save' from pickr library (changes the color of the pickr box for background)
  }

}

// Make Eraser Functional

eraser.addEventListener('click', () => {

  // eraser.classList.toggle('active');           // deprecated by lines starting with: "buttons.forEach((button) => {"
  if (eraser.classList.contains('active')) {
    userColour = pickr2.getColor().toRGBA()

  } else  {
    userColour = pickr.getColor().toRGBA()
  }
})

// Make Toggle lighten Functionality

// lighter.addEventListener('click', () => {      // deprecated by lines starting with: "buttons.forEach((button) => {"
//   lighter.classList.toggle('active');
// })

function lightenColour(cellColour) {
  // let rgbaVal = cellColour.match(/\d+/g); https://stackoverflow.com/questions/10970958/get-a-color-component-from-an-rgb-string-in-javascript; doesnt work well.
  
  // If the string looks like rgba( , , , ) we extract from the 5th position to get ( , , , ), then convert to 
  // arr. If string looks like rgb( , , ), we extract from 4th position in string to get ( , , ); works well.
  rgbaVal = cellColour.includes("a") ?                                     
            cellColour.substring(5, cellColour.length-1).replace(/ /g, '').split(',') : 
            cellColour.substring(4, cellColour.length-1).replace(/ /g, '').split(',');

  if (rgbaVal.length == 3) rgbaVal.push('1'); //
      
  for (let i = 0; i<=2; i++) {
    rgbaVal[i] =  (Number(rgbaVal[i]) + 25).toString();
    // rgbaVal[rgbaVal.length - 1] =  (Number(rgbaVal[rgbaVal.length - 1]) - 0.2).toString();  previous way of making lighter, but reducing opacity
                                                                                              // is not good because gap background colour gets revealed 
  }

  return rgbaVal;

}

// Make Toggle Shader Functionality

// shader.addEventListener('click', () => {       // deprecated by lines starting with: "buttons.forEach((button) => {"
//   shader.classList.toggle('active');
// })

function shadeColour(cellColour) {
  // let rgbaVal = cellColour.match(/\d+/g); https://stackoverflow.com/questions/10970958/get-a-color-component-from-an-rgb-string-in-javascript; doesnt work well.
  
  // If the string looks like rgba( , , , ) we extract from the 5th position to get ( , , , ), then convert to 
  // arr. If string looks like rgb( , , ), we extract from 4th position in string to get ( , , ); works well.

  rgbaVal = cellColour.includes("a") ?    
                                              
            cellColour.substring(5, cellColour.length-1).replace(/ /g, '').split(',') : 
            cellColour.substring(4, cellColour.length-1).replace(/ /g, '').split(',');
  if (rgbaVal.length == 3) rgbaVal.push('1');
      
  for (let i = 0; i<=2; i++) {
    rgbaVal[i] =  (Number(rgbaVal[i]) - 25).toString();
  }

  return rgbaVal;

}

// Make Toggle Pastel Functionality

// When a given button is toggled, disable all other togglable buttons (gridLines is not togglable).

let togglable = document.querySelectorAll('.togglable');

togglable.forEach((button) => {
  button.addEventListener('click', () => {

    if (button.classList.contains('active')) {
      button.classList.remove('active');
    }

    else {
      togglable.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    }
    
  });
});


function changeSize(size) {
  populateBoard(size)
}

function initPenColour() {
  pickr.on('change', (color) => {
    userColour = color.toRGBA().toString();
    pickr.applyColor(true) // Does the same functionality as 'save' from pickr library (changes the color of the pickr box for pen colour)
    if (pickr.isOpen()) {
      eraser.classList.remove('active');
      lighter.classList.remove('active');
      shader.classList.remove('active');
    }
  })

}

function initBoard() {
  initPenColour()
  populateBoard(50);
}

initBoard()



