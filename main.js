let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function populateBoard(size) { 

  let board = document.querySelector(".board");
  squares = board.querySelectorAll('div');
  squares.forEach((item) => (item.delete()))
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



changeSize(16)


