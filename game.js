const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

let currentShape = 'circle'; // Start with the circle shape
let playerX = canvas.width / 2;
let playerY = canvas.height - 100;
let shapeSize = 50;

// Function to handle shape switching on touch and mouse events
function handleInput(inputX) {
    // Divide the screen into three zones
    if (inputX < canvas.width / 3) {
        currentShape = 'circle'; // Left side of the screen switches to circle
        console.log("Shape changed to circle");
    } else if (inputX < (canvas.width / 3) * 2) {
        currentShape = 'square'; // Middle section switches to square
        console.log("Shape changed to square");
    } else {
        currentShape = 'triangle'; // Right side switches to triangle
        console.log("Shape changed to triangle");
    }
}

// Touch event listener
canvas.addEventListener('touchstart', (event) => {
    const touchX = event.touches[0].clientX;
    console.log("Touch detected at X position:", touchX);
    handleInput(touchX);
    event.preventDefault(); // Prevent scrolling
});

// Mouse event listener for desktop
canvas.addEventListener('mousedown', (event) => {
    const clickX = event.clientX;
    console.log("Mouse click detected at X position:", clickX);
    handleInput(clickX);
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
