/* Content of game display */
let canvas = document.getElementById('gameCanvas'),
    canvasContext = canvas.getContext('2d'),
    paddleHeight = 110,
    paddleWidth = 10,
    paddleOne = 250,
    paddleOneDirection = null,
    paddleOneVelocity = 15,
    paddleTwo = 250,
    paddleTwoDirection= null,
    paddleTwoVelocity = 10,
    ballPositionX = canvas.width/2,
    ballPositionY = canvas.height/2,
    ballSize = 22,
    ballVelocityX = 8,
    ballVelocityY = 0,
    playerOneScore = 0,
    playerTwoScore = 0,
    startOption = document.getElementById('startOption'),
    pauseOption = document.getElementById('pauseOption'),
    gameOverOption = document.getElementById('gameOverOption'),
    gameplay = document.getElementById('gameplay'),
    startBtn = document.getElementById('startBtn'),
    continueBtn = document.getElementById('continueBtn'),
    restartBtn = document.getElementById('restartBtn'),
    againBtn = document.getElementById('againBtn'),
    gameMessage = document.getElementById('gameMessage'),
    fps = 65,
    gamePaused = false,
    gameInProgress = false,
    scoreToWin = 5,
    difficultyLevel = 1,
    gameInterval = window.setInterval(function() {});

/* Adds event listeners for when buttons are clicked or keys are pressed */
window.addEventListener('resize', windowResize);
startBtn.addEventListener('click', startGame);
continueBtn.addEventListener('click', resumeGame);
restartBtn.addEventListener('click', resetGame);
againBtn.addEventListener('click', resetGame);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ballPositionY = canvas.height/2 - ballSize/2 
paddleOne = canvas.height/2 - paddleHeight/2;
paddleTwo = canvas.height/2 - paddleHeight/2;
ballVelocityY = getRandomNumber(-5,5) * (.25 * difficultyLevel),

/* Start Up page */
startOption.className = 'active';
pauseOption.className = '';
gameplay.className = '';
gameOverOption.className = '';

window.onblur = function() {
  if(gameInProgress) pauseGame();  
}

/* Begins running game code when start button is clicked */
function startGame() {
  gameInProgress = true;
  gameplay.className = '';
  startOption.className = '';
  gameOverOption.className = '';
  pauseOption.className = '';
  gamePaused = false;
  gameInterval = window.setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000/fps);
}

/* Resets game display when reset button is clicked */
function resetGame() {
  playerOneScore = 0;
  playerTwoScore = 0;
  difficultyLevel = 1,
  ballPositionX = canvas.width/2 - ballSize/2;
  ballPositionY = canvas.height/2 - ballSize/2;
  paddleOne = canvas.height/2 - paddleHeight/2;
  paddleTwo = canvas.height/2 - paddleHeight/2;
  ballVelocityY = getRandomNumber(-5,5) * (.25 * difficultyLevel),
  startGame();
}

/* Pause options */
function togglePause() {
  if(gamePaused) {
    resumeGame();
  } else {
    pauseGame();
  }
} 

function pauseGame() {
  if(!gamePaused) {
    gamePaused = true;
    gameplay.className = '';
    pauseOption.className = 'active';
    clearInterval(gameInterval);
  }
}

function resumeGame() {
  if(gamePaused) {
    gamePaused = false;
    gameplay.className = '';
    pauseOption.className = ''; 
    startGame();
  }
}

function windowResize() {
  resetBall();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawEverything();
}