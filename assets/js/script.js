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