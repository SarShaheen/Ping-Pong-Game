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

/* Keyboard functions */
function keyDown(e) {
  e.preventDefault();
  switch(e.keyCode) {
    case 13:
      if(gameInProgress) togglePause();
      break;
    case 38:
      if(!gamePaused) paddleOneDirection = 'up';
      break;
    case 40:
      if(!gamePaused) paddleOneDirection = 'down';
      break;
  }
}

function keyUp(e) {
  paddleOneDirection = null;
}

function resetBall() {
  ballVelocityX = -ballVelocityX;
  ballVelocityY = getRandomNumber(-5,5) * (.25 * difficultyLevel);
  ballPositionX = canvas.width/2;
  ballPositionY = canvas.height/2;
}

/* Calculates score */
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomizeGame() {
  paddleTwoVelocity = getRandomNumber(10,20) * (.25 * difficultyLevel);
}

/* Game over option */
function gameOver(playerWon) {
  gameInProgress = false;
  clearInterval(gameInterval);
  gameMessage.textContent = '';
  againBtn.textContent = '';
  if(playerWon) {
    gameMessage.textContent = 'Yay, You won!';
    againBtn.textContent = 'Play again?';
  } else {
    gameMessage.textContent = 'Aww, you lost.';
    againBtn.textContent = 'Try again?';
  }
  gameplay.className = '';
  gameOverOption.className = 'active'; 
}

function moveEverything() {
  ballPositionX = ballPositionX + ballVelocityX;
  if(ballPositionX > canvas.width - paddleWidth*2 - ballSize/2) {
    if(ballPositionY >= paddleTwo && ballPositionY <= paddleTwo + paddleHeight && ballPositionX < canvas.width - paddleWidth) {
      ballVelocityX = -ballVelocityX;
      if(ballPositionY >= paddleTwo && 
         ballPositionY < paddleTwo + paddleHeight*.2) {
        ballVelocityY = -15 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleTwo + paddleHeight*.2 && 
                ballPositionY < paddleTwo + paddleHeight*.4) {
        ballVelocityY = -10 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleTwo + paddleHeight*.4 && 
                ballPositionY < paddleTwo + paddleHeight*.6) {
        ballVelocityY = getRandomNumber(-5,5);;
      } else if(ballPositionY >= paddleTwo + paddleHeight*.6 && 
                ballPositionY < paddleTwoVelocity + paddleHeight*.8) {
        ballVelocityY = 10 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleTwo + paddleHeight*.8 && 
                ballPositionY < paddleTwo + paddleHeight) {
        ballVelocityY = 15 * (.25 * difficultyLevel);
      }
    /* Displays winner message */
    } else if(ballPositionX > canvas.width) {
      resetBall();
      playerOneScore++;
      difficultyLevel = playerOneScore*.5;
      if(playerOneScore === scoreToWin) gameOver(true);
    }
    randomizeGame();
  } else if(ballPositionX < paddleWidth*2 + ballSize/2) {
    if(ballPositionY >= paddleOne && 
       ballPositionY <= paddleOne + paddleHeight && 
       ballPositionX > paddleWidth + ballSize/2) {
      ballVelocityX = -ballVelocityX;
      if(ballPositionY >= paddleOne && 
         ballPositionY < paddleOne + paddleHeight*.2) {
        ballVelocityY = -20 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleOne + paddleHeight*.2 && 
                ballPositionY < paddleOne + paddleHeight*.4) {
        ballVelocityY = -10 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleOne + paddleHeight*.4 && 
                ballPositionY < paddleOneVelocity + paddleHeight*.6) {
        ballVelocityY = 0 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleOne  + paddleHeight*.6 && 
                ballPositionY < paddleOne + paddleHeight*.8) {
        ballVelocityY = 10 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleOne + paddleHeight*.8 && 
                ballPositionY < paddleOne + paddleHeight) {
        ballVelocityY = 20 * (.25 * difficultyLevel);
      }
    /* Displays lose message */
    } else if(ballPositionX <= -ballSize) {
      resetBall();
      playerTwoScore++;
      if(playerTwoScore === scoreToWin) gameOver(false);
    }
    randomizeGame();
  }

  /* Ball and paddle controls */
  ballPositionY = ballPositionY + ballVelocityY; 
  if(ballPositionY > canvas.height - ballSize/2) {
    ballVelocityY = -ballVelocityY;
    ballPositionY = canvas.height - ballSize/2;
  } else if(ballPositionY < ballSize/2) {
    ballVelocityY = -ballVelocityY;
    ballPositionY = ballSize/2;
  }
  
  if(paddleOneDirection === 'up' && paddleOne >= 0) {
    paddleOne = paddleOne - paddleOneVelocity;
  } else if(paddleOneDirection === 'down' && 
            paddleOne < (canvas.height - paddleHeight) ) {
    paddleOne += paddleOneVelocity; 
  }
  
  if(ballPositionY < paddleTwo) {
    paddleTwo -= paddleTwoVelocity;
  } else if(ballPositionY > paddleTwo + paddleHeight) {
    paddleTwo += paddleTwoVelocity;    
  }
}

/* Sets game display in window */
function drawEverything() {
  
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = 'blue';
  canvasContext.beginPath();
  canvasContext.arc(ballPositionX, ballPositionY, ballSize/2, 0, Math.PI*2, true);
  canvasContext.fill();
  
  canvasContext.fillStyle = '#323432';
  canvasContext.fillRect(paddleWidth,paddleOne,paddleWidth,paddleHeight); 
  
  canvasContext.fillStyle = '#323432';
  canvasContext.fillRect(canvas.width - paddleWidth - paddleWidth,paddleTwo,paddleWidth,paddleHeight);
  
  canvasContext.fillStyle = '#A1A5A1';
  canvasContext.font = "200px 'Oswald', sans-serif";
  canvasContext.textAlign = "center";
  canvasContext.fillText(playerOneScore,canvas.width*.25,canvas.height/2 + 75);
  
  canvasContext.fillStyle = '#A1A5A1';
  canvasContext.font = "200px 'Oswald', sans-serif";
  canvasContext.textAlign = "center";
  canvasContext.fillText(playerTwoScore,canvas.width*.75,canvas.height/2 + 75);
  
  canvasContext.strokeStyle = '#323432';
  canvasContext.beginPath();
  canvasContext.moveTo(canvas.width/2,0);
  canvasContext.lineTo(canvas.width/2,canvas.height);
  canvasContext.stroke();
}