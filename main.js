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
    board.appendChild(square);
  }
}

function changeSize(size) {
  populateBoard(size)
}

changeSize(4)
