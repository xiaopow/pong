// Global variables
var bW = 50;
var bH = 50;
var speed = 100;
var highScore = 0;
var gameChoice = 1;
// player1 variables
var score;
var xArr = [];
var xArrCheck =[];
var yPos = 0;
var dir = "";
var inp = "";
var level = 1; 

$(document).ready(function(){
  var timer;
  var cube = 0;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var w=$('#canvas').width();
  var h=$('#canvas').height();
  var ballPosition = {x: 1, y: 50};
  var ballVelocity = {x: 1, y: 1};
  var ballSize = 10;
  var timer;
  var boardSize = {x: 10, y: 50}
  var boardPosA = {x: 10, y: (h/2)-25};
  var boardPosB = {x: w-20, y: (h/2)-25};
  var keys = {};

  function initBall () {
    ctx.fillStyle = "white";
    ctx.fillRect(ballPosition.x,ballPosition.y,ballSize,ballSize);
  }

  function initBoards () {
    ctx.fillStyle = "white";
    ctx.fillRect(boardPosA.x,boardPosA.y,boardSize.x,boardSize.y);
    ctx.fillRect(boardPosB.x,boardPosB.y,boardSize.x,boardSize.y);
  }

  function moveBall () {
    if (ballPosition.x == w - ballSize ) {
      clearInterval(timer);
    }
    if (ballPosition.x == 0) {
      clearInterval(timer);
    }
    ctx.clearRect(ballPosition.x,ballPosition.y,ballSize,ballSize);
    if (ballPosition.y == h - ballSize || ballPosition.y == 0) {
      ballVelocity.y = -(ballVelocity.y);
    }
    if (ballPosition.x == boardPosA.x + boardSize.x) {
      console.log("in board A x");
      if (ballPosition.y < boardPosA.y + boardSize.y) {
        console.log("smaller than baord A y")
        if (ballPosition.y + ballSize > boardPosA.y) {
          console.log("hits A");
          ballVelocity.x = -(ballVelocity.x);
        }
      }
    }
    if (ballPosition.x + ballSize == boardPosB.x) {
      console.log("in board B x");
      if (ballPosition.y < boardPosB.y + boardSize.y) {
        console.log("smaller than board B y");
        if (ballPosition.y + ballSize > boardPosB.y) {
          console.log("hits B");
          ballVelocity.x = -(ballVelocity.x);
        }
      }
    }
    ballPosition.x += ballVelocity.x;
    ballPosition.y += ballVelocity.y;
    ctx.fillRect(ballPosition.x,ballPosition.y,ballSize,ballSize); 
  }

  function moveBoardA (direction) {
    ctx.clearRect(boardPosA.x,boardPosA.y,boardSize.x,boardSize.y);
    if (direction == "up") {
      if (boardPosA.y > 0) {
        boardPosA.y -= 1;
      }
    } else if (direction == "down") {
      if (boardPosA.y + boardSize.y < h) {
        boardPosA.y += 1;
      }
    }
    ctx.fillRect(boardPosA.x,boardPosA.y,boardSize.x,boardSize.y);
  }

  function moveBoardB (direction) {
    ctx.clearRect(boardPosB.x,boardPosB.y,boardSize.x,boardSize.y);
    if (direction == "up") {
      if (boardPosB.y > 0) {
        boardPosB.y -= 1;
      }
    } else if (direction == "down") {
      if (boardPosB.y + boardSize.y < h) {
        boardPosB.y += 1;
      }
    }
    ctx.fillRect(boardPosB.x,boardPosB.y,boardSize.x,boardSize.y);
  }

  $(document).keydown(function(e){
    if (e.keyCode == 38) {
      keys["bUp"] = true;
    } else if (e.keyCode == 40) {
      keys["bDown"] = true;
    }else if (e.keyCode == 87) {
      keys["aUp"] = true;
    } else if (e.keyCode == 83) {
      keys["aDown"] = true;
    }
  });

  $(document).keyup(function(e){
    if (e.keyCode == 38) {
      keys["bUp"] = false;
    } else if (e.keyCode == 40) {
      keys["bDown"] = false;
    }else if (e.keyCode == 87) {
      keys["aUp"] = false;
    } else if (e.keyCode == 83) {
      keys["aDown"] = false;
    }
  });

  initBall();
  initBoards();

  timer = setInterval(function(){
    moveBall()
    if (keys.aUp) {
      moveBoardA("up");
    }
    if (keys.aDown) {
      moveBoardA("down");
    }
    if (keys.bUp) {
      moveBoardB("up");
    }
    if (keys.bDown) {
      moveBoardB("down");
    }
  }, 5);

});
