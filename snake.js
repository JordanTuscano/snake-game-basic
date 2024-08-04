const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const cellSize = 20;
let snake = [{x: 200, y: 200}];
let direction = {x: 0, y: 0};
let food = {x: 0, y: 0};
let score = 0;

function startGame() {
    snake = [{x: 200, y: 200}];
    direction = {x: 0, y: 0};
    score = 0;
    document.getElementById('score').innerText = score;
    placeFood();
    gameLoop();
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize;
    food.y = Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize;
}

function gameLoop() {
    if (moveSnake()) {
        drawGame();
        setTimeout(gameLoop, 100);
    } else {
        alert("Game Over! Your score: " + score);
    }
}

function moveSnake() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        score++;
        document.getElementById('score').innerText = score;
        placeFood();
    } else {
        snake.pop();
        if (snake.some(segment => segment.x === head.x && segment.y === head.y) ||
            head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            return false;
        }
        snake.unshift(head);
    }
    return true;
}

function drawGame() {
    ctx.fillStyle = '#a8dadc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#e63946';
    ctx.fillRect(food.x, food.y, cellSize, cellSize);

    ctx.fillStyle = '#1d3557';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, cellSize, cellSize));
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction.y === 0) direction = {x: 0, y: -cellSize};
    if (event.key === 'ArrowDown' && direction.y === 0) direction = {x: 0, y: cellSize};
    if (event.key === 'ArrowLeft' && direction.x === 0) direction = {x: -cellSize, y: 0};
    if (event.key === 'ArrowRight' && direction.x === 0) direction = {x: cellSize, y: 0};
});

startGame();
