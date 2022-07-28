let mouseDown = false

let slider = document.getElementById('slider');
let selector = document.getElementById('selector');
let selectValue = document.getElementById('selectValue');
let progressBar = document.getElementById('progressBar');
let gridSize = document.querySelector('.gridSize');

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
}


document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function populateBoard(size) { 

  let board = document.querySelector(".board");
  squares = board.querySelectorAll('div');
  squares.forEach((div) => (div.remove()));
  board.style.gridTemplateColumns =  `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows =  `repeat(${size}, 1fr)`;  

  let amount = size * size;
  for (let i = 0; i < amount; i++) {
    let square = document.createElement('div');
    square.style.backgroundColor = 'transparent';
    square.addEventListener('mousedown', changeColour)
    square.addEventListener('mouseover', changeColour)
    board.appendChild(square);
    
  }
}

function changeColour(e) {
  console.log("type: " + e.type + " " + "mouseDown: " + mouseDown)
  if (e.type === 'mouseover' && !mouseDown) return
  
  else (e.target.style.backgroundColor = 'red')

  
}

function changeSize(size) {
  
  populateBoard(size)
}


populateBoard(50);




