let mouseDown = false

let slider = document.getElementById('slider');
let selector = document.getElementById('selector');
let selectValue = document.getElementById('selectValue');
let progressBar = document.getElementById('progressBar');
let gridSize = document.querySelector('.gridSize');
let clearGrid = document.querySelector("#clearGrid");
let gridLines = document.querySelector('.gridLines');
let board = document.querySelector(".board");
let pcrButton = document.querySelector('pcr-button');
let eraser = document.querySelector('#eraser-btn');

selectValue.textContent = slider.value

slider.oninput = function() {
  selectValue.textContent = this.value
  selector.style.left = this.value + '%'
  progressBar.style.width = this.value + '%'
  // gridSize.textContent = this.value
  gridSize.textContent=`Grid Size: ${this.value} x ${this.value}`

}

slider.onmouseup = function() {
  newSize = +this.value
  changeSize(newSize)
  pickr2.setColor(defaultBgColor);
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
    square.style.backgroundColor = 'white';
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
};

// Use Pickr Library for creating colour picker

const pickr = Pickr.create({
  el: '.color-picker',
  theme: 'classic', // or 'monolith', or 'nano'
  default: '#000000',

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
  default: '#ffffff',
  

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

let userColour = '#000000'
let defaultBgColor = 'white'

function changeColour(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  
  else {
    initPenColour()  
    e.target.style.backgroundColor = userColour;
     
  }
}

// Make Chosen Background Colour Functional

let currentBgColor = defaultBgColor;

pickr2.on('change', (color) => {
  bgColor = color.toRGBA().toString();
  currentBgColor = bgColor;
  changeBgColor(bgColor)
})

function changeBgColor(input) {
  let squares = document.querySelectorAll('.square');

  for (let i = 0; i < squares.length; i++) {
    let currentSquare = squares[i];
    currentSquare.style.backgroundColor = input;
    pickr2.applyColor(true) // Does the same functionality as save (changes the color of the pickr box for background)
  }
}


// Make Eraser Functional

eraser.addEventListener('click', () => {
  eraser.classList.toggle('active');
  if (eraser.classList.contains('active')) {
    userColour = currentBgColor;

  } else  {
    userColour = pickr.getColor().toRGBA()
  }
})


function changeSize(size) {
  populateBoard(size)
}

function initPenColour() {
  pickr.on('change', (color) => {
    userColour = color.toRGBA().toString();
    pickr.applyColor(true) // Does the same functionality as save (changes the color of the pickr box for pen colour)
  })
}

function initBoard() {
  initPenColour()
  populateBoard(50);
}

initBoard()



