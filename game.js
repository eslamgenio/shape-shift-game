const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

let currentShape = 'circle'; // Start with the circle shape
let playerX = canvas.width / 2;
let playerY = canvas.height - 100;
let shapeSize = 50;

// Event listener for key presses to switch shapes
document.addEventListener('keydown', (event) => {
    if (event.key === '1') {
        currentShape = 'circle';
    } else if (event.key === '2') {
        currentShape = 'square';
    } else if (event.key === '3') {
        currentShape = 'triangle';
    }
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the current shape
    drawPlayerShape(currentShape);

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
