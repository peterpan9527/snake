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
    this.picklocation();
  }
  picklocation() {
    let newLocation = picklocation(); // 使用 picklocation() 取得新位置
    this.x = newLocation.x;
    this.y = newLocation.y;
  }
  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }
}
function picklocation() {
  let new_x, new_y;

  do {
    new_x = Math.floor(Math.random() * column) * unit;
    new_y = Math.floor(Math.random() * row) * unit;
  } while (isOverlapping(new_x, new_y)); // 檢查是否與蛇的座標重疊

  return { x: new_x, y: new_y }; // 回傳新位置
}

function isOverlapping(x, y) {
  for (let i = 0; i < snake.length; i++) {
    if (x === snake[i].x && y === snake[i].y) {
      return true; // 如果重疊，回傳 true
    }
  }
  return false; // 沒有重疊，回傳 false
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
    myFruit.picklocation();
    myFruit.drawFruit();
  } else {
    snake.pop();
  }
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    eatSound.play();
  }
  // **新增邏輯：只有當蛇的長度大於 4 時，才開始檢查碰撞**
  if (snake.length > 4) {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === newhead.x && snake[i].y === newhead.y) {
        clearInterval(mygame);
        alert("game over");
        return;
      }
    }
  }
  snake.unshift(newhead);

  draw();
}
let mygame = setInterval(update, 100);
