const canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box
}
let direction; 
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function addBG() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for(let i = 0; i < snake.length; i++) {
    context.fillStyle = 'green';
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function drawFood() {
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

// Add movements
document.addEventListener('keydown', update);

function update(event) {
  if(event.keyCode === 37 && direction !== 'right') {
    direction = 'left'
  }
  if(event.keyCode === 38 && direction !== 'down') {
    direction = 'up'
  }
  if(event.keyCode === 39 && direction !== 'left') {
    direction = 'right' 
  }
  if(event.keyCode === 40 && direction !== 'up') {
    direction = 'down'
  }
}

function startGame() {

  // Ends the game when snake meets itself
  for(let i = 1; i < snake.length; i++) {
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert('GAME OVER :(')
    }
  }


   // Makes game end if snake touches the border
   if(snake[0].x > 15 * box && direction === 'right') {
    clearInterval(game);
    alert('GAME OVER :(')
  }
  if(snake[0].x < 0 && direction === 'left') {
    clearInterval(game);
    alert('GAME OVER :(')
  }
  if(snake[0].y > 15 * box && direction === 'down') {
    clearInterval(game);
    alert('GAME OVER :(')
  }
  if(snake[0].y < 0 && direction === 'up') {
    clearInterval(game);
    alert('GAME OVER :(')
  }

  addBG();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction == 'right') {
    snakeX += box;
  }
  if(direction == 'left') {
    snakeX -= box;
  }
  if (direction == 'up') {
    snakeY -= box;
  }
  if (direction == 'down') {
    snakeY += box;
  }

  // Makes snake grow when eating the food and places new food randomly
  if(snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }
  
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);
}


let game = setInterval(startGame, 100)