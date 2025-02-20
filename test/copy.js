const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;
let snake = [
  { x: 80, y: 0 },
  { x: 60, y: 0 },
  { x: 40, y: 0 },
  { x: 20, y: 0 },
];
class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  drawFruit() {
    ctx.fillRect(this.x, this.y, unit, unit);
    ctx.fillStyle = "yellow";
  }
}
let myFruit = new Fruit();
window.addEventListener("keydown", changeDirection);
let d = "left";
function changeDirection(e) {
  if (e.key == "ArrowRight" && d != "left") {
    d = "right";
  } else if (e.key == "ArrowLeft" && d != "right") {
    d = "left";
  } else if (e.key == "ArrowUp" && d != "down") {
    d = "up";
  } else if (e.key == "ArrowDown" && d != "up") {
    d = "down";
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布，避免殘影
  myFruit.drawFruit();
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeStyle = "white"; // 外框
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);

    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    } else if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    } else if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    } else if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
  }
}
function update() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d === "left") {
    snakeX -= unit;
  } else if (d === "up") {
    snakeY -= unit;
  } else if (d === "down") {
    snakeY += unit;
  } else if (d === "right") {
    snakeX += unit;
  }

  let newhead = {
    x: snakeX,
    y: snakeY,
  };

  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    console.log("go");
  } else {
    snake.pop();
  }

  snake.unshift(newhead);

  draw();
}
let mygame = setInterval(update, 100);
