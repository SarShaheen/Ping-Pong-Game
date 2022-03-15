/* Content of game display */
let canvas = document.getElementById('gameCanvas'),
    canvasContext = canvas.getContext('2d'),
    paddleHeight = 110,
    paddleWidth = 10,
    paddleOne = 250,
    paddleOneDirection = null,
    paddleOneSpeed = 15,
    paddleTwo = 250,
    paddleTwoDirection= null,
    paddleTwoSpeed = 10,
    ballPositionX = canvas.width/2,
    ballPositionY = canvas.height/2,
    ballSize = 22,
    ballSpeedX = 8,
    ballSpeedY = 0,
    playerOneScore = 0,
    playerTwoScore = 0,
    startOption = document.getElementById('startOption'),
    pauseOption = document.getElementById('pauseOption'),
    gameOver = document.getElementById('gameOver'),
    game = document.getElementById('game'),
    begin = document.getElementById('begin'),
    continueBtn = document.getElementById('continueBtn'),
    restart = document.getElementById('restart'),
    again = document.getElementById('again'),
    gameMessage = document.getElementById('gameMessage'),
    fps = 70,
    gamePaused = false,
    gameInProgress = false,
    scoreToWin = 5,
    difficultyLevel = 1,
    gameInterval = window.setInterval(function() {});

/* Adds event listeners for when buttons are clicked or keys are pressed */
window.addEventListener('resize', resizeWindow);
begin.addEventListener('click', startGame);
continueBtn.addEventListener('click', resumeGame);
restart.addEventListener('click', resetGame);
again.addEventListener('click', resetGame);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ballPositionY = canvas.height/2 - ballSize/2 
paddleOne = canvas.height/2 - paddleHeight/2;
paddleTwo = canvas.height/2 - paddleHeight/2;
ballSpeedY = getRandomNumber(-5,5) * (.25 * difficultyLevel),

/* Start Up page */
startOption.className = 'active';
pauseOption.className = '';
game.className = '';
gameOver.className = '';

window.onblur = function() {
  if(gameInProgress) pauseGame();  
}

/* Begins running game code when start button is clicked */
function startGame() {
  gameInProgress = true;
  game.className = '';
  startOption.className = '';
  gameOver.className = '';
  pauseOption.className = '';
  gamePaused = false;
  gameInterval = window.setInterval(function() {
    moveGame();
    drawGame();
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
  ballSpeedY = getRandomNumber(-5,5) * (.25 * difficultyLevel),
  startGame();
}

/* Pause options */
function clickedPause() {
  if(gamePaused) {
    resumeGame();
  } else {
    pauseGame();
  }
} 

function pauseGame() {
  if(!gamePaused) {
    gamePaused = true;
    game.className = '';
    pauseOption.className = 'active';
    clearInterval(gameInterval);
  }
}

function resumeGame() {
  if(gamePaused) {
    gamePaused = false;
    game.className = '';
    pauseOption.className = ''; 
    startGame();
  }
}

function resizeWindow() {
  resetBall();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawGame();
}

function resetBall() {
  ballSpeedX = -ballSpeedX;
  ballSpeedY = getRandomNumber(-5,5) * (.25 * difficultyLevel);
  ballPositionX = canvas.width/2;
  ballPositionY = canvas.height/2;
}

/* Keyboard functions */
function keyDown(a) {
  a.preventDefault();
  switch(a.keyCode) {
    case 13:
      if(gameInProgress) clickedPause();
      break;
    case 38:
      if(!gamePaused) paddleOneDirection = 'up';
      break;
    case 40:
      if(!gamePaused) paddleOneDirection = 'down';
      break;
  }
}

function keyUp(a) {
  paddleOneDirection = null;
}

/* Calculates score */
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomizeGame() {
  paddleTwoSpeed = getRandomNumber(10,20) * (.25 * difficultyLevel);
}

/* Game function */
function moveGame() {
  ballPositionX = ballPositionX + ballSpeedX;
  if(ballPositionX > canvas.width - paddleWidth*2 - ballSize/2) {
    if(ballPositionY >= paddleTwo && ballPositionY <= paddleTwo + paddleHeight && ballPositionX < canvas.width - paddleWidth) {
      ballSpeedX = -ballSpeedX;
      if(ballPositionY >= paddleTwo && 
         ballPositionY < paddleTwo + paddleHeight*.2) {
        ballSpeedY = -15 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleTwo + paddleHeight*.2 && 
                ballPositionY < paddleTwo + paddleHeight*.4) {
        ballSpeedY = -10 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleTwo + paddleHeight*.4 && 
                ballPositionY < paddleTwo + paddleHeight*.6) {
        ballSpeedY = getRandomNumber(-5,5);;
      } else if(ballPositionY >= paddleTwo + paddleHeight*.6 && 
                ballPositionY < paddleTwoSpeed + paddleHeight*.8) {
        ballSpeedY = 10 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleTwo + paddleHeight*.8 && 
                ballPositionY < paddleTwo + paddleHeight) {
        ballSpeedY = 15 * (.25 * difficultyLevel);
      }
    /* Displays winner message */
    } else if(ballPositionX > canvas.width) {
      resetBall();
      playerOneScore++;
      difficultyLevel = playerOneScore*.5;
      if(playerOneScore === scoreToWin) gameFinished(true);
    }
    randomizeGame();
  } else if(ballPositionX < paddleWidth*2 + ballSize/2) {
    if(ballPositionY >= paddleOne && 
       ballPositionY <= paddleOne + paddleHeight && 
       ballPositionX > paddleWidth + ballSize/2) {
      ballSpeedX = -ballSpeedX;
      if(ballPositionY >= paddleOne && 
         ballPositionY < paddleOne + paddleHeight*.2) {
        ballSpeedY = -20 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleOne + paddleHeight*.2 && 
                ballPositionY < paddleOne + paddleHeight*.4) {
        ballSpeedY = -10 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleOne + paddleHeight*.4 && 
                ballPositionY < paddleOneSpeed + paddleHeight*.6) {
        ballSpeedY = 0 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleOne  + paddleHeight*.6 && 
                ballPositionY < paddleOne + paddleHeight*.8) {
        ballSpeedY = 10 * (.25 * difficultyLevel);
      } else if(ballPositionY >= paddleOne + paddleHeight*.8 && 
                ballPositionY < paddleOne + paddleHeight) {
        ballSpeedY = 20 * (.25 * difficultyLevel);
      }
    /* Displays lose message */
    } else if(ballPositionX <= -ballSize) {
      resetBall();
      playerTwoScore++;
      if(playerTwoScore === scoreToWin) gameFinished(false);
    }
    randomizeGame();
  }

  /* Game over option */
function gameFinished(playerWon) {
  gameInProgress = false;
  clearInterval(gameInterval);
  gameMessage.textContent = '';
  again.textContent = '';
  if(playerWon) {
    gameMessage.textContent = 'Yay, You won!';
    again.textContent = 'Play again?';
  } else {
    gameMessage.textContent = 'Aww, you lost.';
    again.textContent = 'Try again?';
  }
  game.className = '';
  gameOver.className = 'active'; 
}

  /* Ball and paddle controls */
  ballPositionY = ballPositionY + ballSpeedY; 
  if(ballPositionY > canvas.height - ballSize/2) {
    ballSpeedY = -ballSpeedY;
    ballPositionY = canvas.height - ballSize/2;
  } else if(ballPositionY < ballSize/2) {
    ballSpeedY = -ballSpeedY;
    ballPositionY = ballSize/2;
  }
  
  if(paddleOneDirection === 'up' && paddleOne >= 0) {
    paddleOne = paddleOne - paddleOneSpeed;
  } else if(paddleOneDirection === 'down' && 
            paddleOne < (canvas.height - paddleHeight) ) {
    paddleOne += paddleOneSpeed; 
  }
  
  if(ballPositionY < paddleTwo) {
    paddleTwo -= paddleTwoSpeed;
  } else if(ballPositionY > paddleTwo + paddleHeight) {
    paddleTwo += paddleTwoSpeed;    
  }
}

/* Sets game display in window */
function drawGame() {
  
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = 'blue';
  canvasContext.beginPath();
  canvasContext.arc(ballPositionX, ballPositionY, ballSize/2, 0, Math.PI*2, true);
  canvasContext.fill();
  
  canvasContext.fillStyle = '#4D5359';
  canvasContext.fillRect(paddleWidth,paddleOne,paddleWidth,paddleHeight); 
  
  canvasContext.fillStyle = '#4D5359';
  canvasContext.fillRect(canvas.width - paddleWidth - paddleWidth,paddleTwo,paddleWidth,paddleHeight);
  
  canvasContext.fillStyle = '#ADAEAE';
  canvasContext.font = "175px 'Oswald', sans-serif"; 
  canvasContext.fillText(playerOneScore,canvas.width*.20,canvas.height/7 + 75);
  
  canvasContext.fillStyle = '#ADAEAE';
  canvasContext.font = "175px 'Oswald', sans-serif";
  canvasContext.fillText(playerTwoScore,canvas.width*.70,canvas.height/7 + 75);
  
  canvasContext.strokeStyle = '#4D5359';
  canvasContext.beginPath();
  canvasContext.moveTo(canvas.width/2,0);
  canvasContext.lineTo(canvas.width/2,canvas.height);
  canvasContext.stroke();
}