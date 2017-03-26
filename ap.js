let canvas;
let canvasCtxt;
let ballX = 250;
let ballY = 250;
let ballSpeedX = 10;
let ballSpeedY = 10;

let paddle1Y = 250;
let paddle2Y = 250
const paddleHeight = 100;
const paddleWidth = 10;

let player1 = 0;
let player2 = 0;
const win = 3;

let winScreen = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasCtxt = canvas.getContext('2d');

    const framesPerSecond = 30
    setInterval(function() {
      drawEverything();
      moveEverything();
    },1000/framesPerSecond);

    canvas.addEventListener('mousemove',
                            function(evt) {
                              let mousePos = calculateMousePosition(evt);
                              paddle1Y = mousePos.y - (paddleHeight/2);
    });
    canvas.addEventListener('mousedown',
                            function() {
                              if (winScreen) {
                                player1 = 0;
                                player2 = 0;
                                winScreen = false;
                              }

    });

}




const computerMovement =()=> {
  let paddle2YCenter = paddle2Y +(paddleHeight/2);

  if (paddle2YCenter  < ballY - 35) {
      paddle2Y += 6;

  }  else if (paddle2YCenter  > ballY + 35 ){
    paddle2Y -= 6;
  }

}


const colorRect = (leftX, topY, width,height,drawColor) => {
  canvasCtxt.fillStyle = drawColor;
  canvasCtxt.fillRect(leftX, topY, width,height)

}

const colorCircle = (centerX,centerY,rad,color) => {
  canvasCtxt.fillStyle = color;
  canvasCtxt.beginPath();
  canvasCtxt.arc(centerX,centerY,rad,0,2*Math.PI, true);
  canvasCtxt.fill();
}

const calculateMousePosition = (evt)=> {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = evt.clientX  - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  return  {
      x: mouseX,
      y: mouseY
  }

}

const ballReset = () => {

  if (player1 >= win || player2 >= win) {
    player1 = 0;
    player2 = 0;
    winScreen = true;

  }
    ballSpeedX = - ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;

}
const moveEverything = () => {
    if (winScreen) {
      return;
    }
    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    //Deflecting ball with right paddle
    if (ballX > canvas.width) {
      if ((ballY > paddle2Y) && (ballY < (paddle2Y+paddleHeight))) {
        ballSpeedX = - ballSpeedX;

        let deltaY = ballY - (paddle2Y + paddleHeight/2);
        ballSpeedY = deltaY * 0.35;

      } else {
        player1++; // must be before reset
        ballReset();
      }
    }
    //Deflecting ball with left paddle
    if (ballX < 0) {
      if ((ballY > paddle1Y) && (ballY < (paddle1Y+paddleHeight))) {
        ballSpeedX = - ballSpeedX;

        let deltaY = ballY - (paddle1Y + paddleHeight/2);
        ballSpeedY = deltaY * 0.35;


      } else {
        player2++; // must be before reset
        ballReset();
      }

    }
    if (ballY >= canvas.height) {
      ballSpeedY = - ballSpeedY;
    }
    if (ballY < 0) {
      ballSpeedY = - ballSpeedY;
    }
}

const drawNet = ()=> {
    for(let i = 0; i<canvas.height; i+= 40) {
      colorRect(canvas.width/2-1, i, 2,20,'white');
    }

}



const drawEverything = () => {
    //Blank screen on new line
    colorRect(0,0,canvas.width,canvas.height,"black");

    if (winScreen) {
      canvasCtxt.fillStyle = 'white';
      canvasCtxt.fillText('Click to continue', 100, 100);
      return;
    }
    drawNet();
     //This is left side paddle
      colorRect(0,paddle1Y,paddleWidth,paddleHeight,'white');
      //This is right side paddle
      colorRect(canvas.width-paddleWidth,paddle2Y,paddleWidth,paddleHeight,'white');
    //This is the ball
      colorCircle(ballX,ballY,5,0,'white');


    // Score texts
    canvasCtxt.fillText(player1, 100,100)
    canvasCtxt.fillText(player2, canvas.width - 100,100)
}
