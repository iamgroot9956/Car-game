document.addEventListener("DOMContentLoaded", function() {
    const car = document.getElementById("car");
    const obstacle = document.getElementById("obstacle");
    const levelDisplay = document.getElementById("level");

    let level = 1;
    let carPosition = 180;
    let obstaclePosition = 0;
    let obstacleSpeed = 2;

    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
            if (carPosition > 40) {
                carPosition -= 40;
            }
        } else if (event.key === "ArrowRight") {
            if (carPosition < 320) {
                carPosition += 40;
            }
        }

        car.style.left = carPosition + "px";
    });

    function gameLoop() {
        obstaclePosition += obstacleSpeed;

        if (obstaclePosition > 560) {
            obstaclePosition = -40;
            level++;
            levelDisplay.textContent = "Level: " + level;
            obstacleSpeed += 0.5;
        }

        obstacle.style.top = obstaclePosition + "px";

        if (checkCollision()) {
            endGame();
        } else {
            requestAnimationFrame(gameLoop);
        }
    }

    function checkCollision() {
        const carRect = car.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        return !(
            carRect.bottom < obstacleRect.top ||
            carRect.top > obstacleRect.bottom ||
            carRect.right < obstacleRect.left ||
            carRect.left > obstacleRect.right
        );
    }

    function endGame() {
        alert("Game Over");
        level = 1;
        carPosition = 180;
        obstaclePosition = 0;
        obstacleSpeed = 2;
        levelDisplay.textContent = "Level: " + level;
        car.style.left = carPosition + "px";
        obstacle.style.top = obstaclePosition + "px";
        gameLoop();
    }

    gameLoop();
});