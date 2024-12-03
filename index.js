const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

// Set the canvas size
canvas.width = 800;
canvas.height = 600;

// Game variables
let player = {
  x: 50,
  y: canvas.height / 2,
  width: 50,
  height: 50,
  speed: 5
};

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  speedX: 5,
  speedY: 5
};

let gameStarted = false;

// Draw the player and ball
function drawGame() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fill();

  // Move the ball
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Check for collisions
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.speedY *= -1;
  }

  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.speedX *= -1;
  }

  if (
    ball.x - ball.radius < player.x + player.width &&
    ball.y > player.y &&
    ball.y < player.y + player.height
  ) {
    ball.speedX *= -1;
  }

  if (gameStarted) {
    requestAnimationFrame(drawGame);
  }
}

// Start the game
startButton.addEventListener('click', () => {
  gameStarted = true;
  drawGame();
});

// Reset the game
resetButton.addEventListener('click', () => {
  gameStarted = false;
  player.x = 50;
  player.y = canvas.height / 2;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speedX = 5;
  ball.speedY = 5;
  drawGame();
});
