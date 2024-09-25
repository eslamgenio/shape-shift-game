const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

let currentShape = 'circle'; // Start with the circle shape
let playerX = canvas.width / 2;
let playerY = canvas.height - 100;
let shapeSize = 50;
let obstacles = [];
let gameOver = false;
let obstacleSpeed = 3;

// Function to handle shape switching on touch and mouse events
function handleInput(inputX) {
    if (gameOver) return; // Do nothing if the game is over
    // Divide the screen into three zones
    if (inputX < canvas.width / 3) {
        currentShape = 'circle'; // Left side of the screen switches to circle
    } else if (inputX < (canvas.width / 3) * 2) {
        currentShape = 'square'; // Middle section switches to square
    } else {
        currentShape = 'triangle'; // Right side switches to triangle
    }
}

// Touch event listener
canvas.addEventListener('touchstart', (event) => {
    const touchX = event.touches[0].clientX;
    handleInput(touchX);
    event.preventDefault(); // Prevent scrolling
});

// Mouse event listener for desktop
canvas.addEventListener('mousedown', (event) => {
    const clickX = event.clientX;
    handleInput(clickX);
});

// Function to create a new obstacle
function createObstacle() {
    const shapes = ['circle', 'square', 'triangle'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomX = Math.random() * (canvas.width - shapeSize);

    obstacles.push({
        x: randomX,
        y: 0,
        shape: randomShape,
        size: shapeSize
    });

    console.log('Obstacle created:', randomShape, randomX); // Debugging line
}

// Function to draw an obstacle
function drawObstacle(obstacle) {
    ctx.fillStyle = '#ff0000'; // Red color for obstacles

    if (obstacle.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(obstacle.x + obstacle.size / 2, obstacle.y + obstacle.size / 2, obstacle.size / 2, 0, Math.PI * 2);
        ctx.fill();
    } else if (obstacle.shape === 'square') {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.size, obstacle.size);
    } else if (obstacle.shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(obstacle.x + obstacle.size / 2, obstacle.y);
        ctx.lineTo(obstacle.x, obstacle.y + obstacle.size);
        ctx.lineTo(obstacle.x + obstacle.size, obstacle.y + obstacle.size);
        ctx.closePath();
        ctx.fill();
    }
}

// Function to check collision between the player and an obstacle
function checkCollision(obstacle) {
    const distance = Math.abs(obstacle.y + obstacle.size - playerY);
    const isSameShape = currentShape === obstacle.shape;
    
    if (distance < shapeSize && !isSameShape) {
        gameOver = true; // End the game if the player shape doesn't match the obstacle
    }
}

// Game loop
function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = '#000000';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 75, canvas.height / 2);
        return; // Stop the game loop if game over
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the current shape
    drawPlayerShape(currentShape);

    // Update and draw obstacles
    obstacles.forEach((obstacle, index) => {
        obstacle.y += obstacleSpeed; // Move obstacle down
        console.log('Obstacle position:', obstacle.y); // Debugging line
        drawObstacle(obstacle);
        checkCollision(obstacle);

        // Remove obstacle if it goes off screen
        if (obstacle.y > canvas.height) {
            obstacles.splice(index, 1);
        }
    });

    requestAnimationFrame(gameLoop);
}

// Function to draw the player shape
function drawPlayerShape(shape) {
    ctx.fillStyle = '#00ff00'; // Green color

    if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(playerX, playerY, shapeSize / 2, 0, Math.PI * 2);
        ctx.fill();
    } else if (shape === 'square') {
        ctx.fillRect(playerX - shapeSize / 2, playerY - shapeSize / 2, shapeSize, shapeSize);
    } else if (shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(playerX, playerY - shapeSize / 2);
        ctx.lineTo(playerX - shapeSize / 2, playerY + shapeSize / 2);
        ctx.lineTo(playerX + shapeSize / 2, playerY + shapeSize / 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Start the game loop
gameLoop();

// Create obstacles at regular intervals
setInterval(createObstacle, 2000); // Create a new obstacle every 2 seconds
