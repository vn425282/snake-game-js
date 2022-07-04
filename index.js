const snakeBoard = document.getElementById("gameCanvas");
const snakeBoardContent = snakeBoard.getContext("2d");
const scoreEl = document.getElementById("score");

console.log("snakeBoardContent", snakeBoardContent);

let snake = [
	{x: 200, y: 200},  
	{x: 190, y: 200},
	{x: 180, y: 200},
	{x: 170, y: 200},
	{x: 160, y: 200}
];

let dx = 10;
let dy = 0;

let foodX = randomFood(0, snake[0].x);
let foodY = randomFood(0, snake[0].y);

console.log(foodX, foodY);

const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_DOWN = 40;
const KEY_UP = 38;

function drawSnakePart(snakePart) {
  snakeBoardContent.fillStyle = 'lightblue';  
  snakeBoardContent.strokeStyle = 'darkblue';
  snakeBoardContent.fillRect(snakePart.x, snakePart.y, 10, 10); 
  snakeBoardContent.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
	snake.forEach(drawSnakePart);
}

function clearBoard() {
	// init board
    snakeBoardContent.fillStyle = 'white';  
	snakeBoardContent.strokeStyle = 'black';
    snakeBoardContent.fillRect(0, 0, snakeBoard.width, snakeBoard.height); 
	snakeBoardContent.strokeRect(0, 0, snakeBoard.width, snakeBoard.height); 
};

function moveSnake() {
	// the head of the snake always at 0 
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };
	snake.unshift(head);
	snake.pop();
}

function changeDirection(event) {
	let isMovingRight = dx === 10;
	let isMovingLeft = dx === -10;
	let isMovingUp = dy === -10;
	let isMovingDown = dy === 10;
	const code = event.keyCode;
	if (code === KEY_RIGHT && !isMovingLeft) {
			dx = 10;
			dy = 0;
	} else if (code === KEY_LEFT && !isMovingRight) {
			dx = -10;
			dy = 0;
	} else if (code === KEY_DOWN && !isMovingUp) {
			dy = 10;
			dx = 0;
	} else if (code === KEY_UP && !isMovingDown) {
			dy = -10;
			dx = 0;
	}
}
 
function initGame() {
	main();
	document.addEventListener("keydown", changeDirection);
}

function reset() {
	snake = [
		{x: 200, y: 200},  
		{x: 190, y: 200},
		{x: 180, y: 200},
		{x: 170, y: 200},
		{x: 160, y: 200}
	];
	main();
}

function isEnded() {
	const isHitLeftWall = snake[0].x < 0;
	const isHitRightWall = snake[0].x >= 400;
	const isHitTopWall = snake[0].y < 0;
	const isHitDownWall = snake[0].y >= 400;

	let isDuplicate = false;
	snake.forEach((el , index) => {
		if(index !== 0 && (el.x === snake[0].x && el.y === snake[0].y)) {
			isDuplicate = true;
		}
	});

	return isHitRightWall || isHitLeftWall || isHitTopWall || isHitDownWall || isDuplicate;
}

function randomFood(min, max) {
	return Math.round((Math.random() * ( max - min) + min) / 10) * 10;
}

function generateFood() {
	foodX = randomFood(0, snakeBoard.width - 10);
	foodY = randomFood(0, snakeBoard.height - 10);

	console.log("foodX", foodX);
	console.log("foodY", foodY);
}

function drawFood() {
	snakeBoardContent.fillStyle = 'orange';  
	snakeBoardContent.strokeStyle = 'black';  
	snakeBoardContent.fillRect(foodX, foodY, 10, 10); 
	snakeBoardContent.strokeRect(foodX, foodY, 10, 10);

	snake.forEach((el) => {
		if(el.x === foodX && el.y === foodY) {
			snake.push({
				x: foodX,
				y: foodY
			})
			generateFood();
			scoreEl.textContent = parseInt(scoreEl.textContent, 10 ) + 10;
		}
	});
}

function main() {
	if (isEnded()) {
		const gameOverEl = document.getElementById("game-over");
		gameOverEl.style.display = "block";
		return;
	}
	setTimeout(() => {
		clearBoard();
		drawFood();
		moveSnake();
		drawSnake();
		main();
	}, 100);
}

initGame();

