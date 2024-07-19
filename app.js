document.addEventListener('DOMContentLoaded', () => {
    let player1Health = 100;
    let player2Health = 100;
    let attackInterval; // To store the interval for Player 2's attacks

    initializeStartScreen();

    function startGame() {
        console.log('Starting game...');
        document.querySelector('#start-screen').classList.add('hidden');
        document.querySelector('#game-arena').classList.remove('hidden');
        initializeGame();
    }

    function initializeStartScreen() {
        const startButton = document.querySelector('#start-game-btn');
        if (startButton) {
            console.log('Start button found.');
            startButton.addEventListener('click', startGame);
        } else {
            console.error('Start button not found');
        }
    }

    function initializeGame() {
        console.log('Initializing game...');
        updateHealthBars(); // Set initial health bars

        // Event listeners for player controls
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyUp);

        // Start AI attacks
        startAIAttack();
    }

    function updateHealthBars() {
        console.log('Updating health bars...');
        const player1HealthBar = document.querySelector('#player1-health');
        const player2HealthBar = document.querySelector('#player2-health');

        const maxHealth = 100;
        const player1HealthPercentage = (player1Health / maxHealth) * 100;
        const player2HealthPercentage = (player2Health / maxHealth) * 100;

        if (player1HealthBar) {
            player1HealthBar.style.width = `${(player1HealthPercentage / 2) - 5}%`;
        }
        if (player2HealthBar) {
            player2HealthBar.style.width = `${(player2HealthPercentage / 2) - 5}%`;
        }
    }

    function getPlayer2Position() {
        const player2 = document.querySelector('#player2');
        if (!player2) return null;

        const rect = player2.getBoundingClientRect();
        const arena = document.querySelector('#game-arena').getBoundingClientRect();

        // Return the position relative to the arena
        return {
            left: rect.left - arena.left,
            right: rect.right - arena.left
        };
    }

    function handleKeyPress(e) {
        console.log(`Key pressed: ${e.key}`);
        switch (e.key) {
            case ',':
                moveCharacter('#player1', -5); // Move left by 5 pixels
                break;
            case '.':
                moveCharacter('#player1', 5); // Move right by 5 pixels
                break;
            case ' ':
                jump('#player1'); // Handle jump
                break;
            case 'a':
                attack('#player1', '#player2'); // Handle attack
                break;
            case 's':
                block('#player1'); // Handle block
                break;
        }
    }

    function handleKeyUp(e) {
        if (e.key === 's') {
            const player1 = document.querySelector('#player1');
            if (player1) {
                player1.classList.remove('block-animation'); 
            }
        }
    }

    function moveCharacter(playerId, dx) {
        const character = document.querySelector(playerId);
        if (!character) return; // Ensure the player element exists

        const rect = character.getBoundingClientRect();
        const arena = document.querySelector('#game-arena').getBoundingClientRect();

        // Get Player 2's position for boundary checking
        const player2Position = getPlayer2Position();
        if (!player2Position) return;

        // Calculate the new horizontal position
        let newLeft = rect.left - arena.left + dx;

        // Ensure the new position is within the arena bounds and Player 2's position
        newLeft = Math.max(0, Math.min(player2Position.left - rect.width, newLeft));

        // Update the player's position
        character.style.left = `${newLeft}px`;
    }

    function jump(playerId) {
        const player = document.querySelector(playerId);
        if (!player) return; // Ensure the player element exists

        const jumpHeight = 5; // Height of the jump in pixels
        const jumpDuration = 200; // Total duration of the jump in milliseconds

        // Get the player's current position
        const rect = player.getBoundingClientRect();
        const arenaRect = document.querySelector('#game-arena').getBoundingClientRect();

        // Calculate the player's initial position from the bottom of the arena
        const initialBottom = rect.bottom - arenaRect.top;

        // Calculate the peak position of the jump
        const peakBottom = initialBottom + jumpHeight;

        // Move the player up to the peak position
        player.style.bottom = `${peakBottom}px`;

        // Move the player back down to the original position after a short delay
        setTimeout(() => {
            player.style.bottom = `${initialBottom}px`;
        }, jumpDuration / 2);
    }

    function attack(attackerId, defenderId) {
        console.log(`${attackerId} attacks ${defenderId}!`);
        // Calculate damage
        const damage = 10;
        if (attackerId === '#player1') {
            player2Health -= damage;
            if (player2Health < 0) player2Health = 0;
            const player2 = document.querySelector('#player2');
            if (player2) {
                player2.classList.add('attack-animation'); // Add attack animation class
            }
        } else if (attackerId === '#player2') {
            player1Health -= damage;
            if (player1Health < 0) player1Health = 0;
            const player1 = document.querySelector('#player1');
            if (player1) {
                player1.classList.add('attack-animation'); // Add attack animation class
            }
        }

        // Update health bars
        updateHealthBars();

        // Add flash effect to health bars
        const defenderHealthBar = document.querySelector(`${defenderId}-health`);
        if (defenderHealthBar) {
            defenderHealthBar.classList.add('flash-health-bar');
        }

        // Remove animation classes after animation completes
        setTimeout(() => {
            const player1 = document.querySelector('#player1');
            const player2 = document.querySelector('#player2');
            if (player1) player1.classList.remove('attack-animation');
            if (player2) player2.classList.remove('attack-animation');
            if (defenderHealthBar) defenderHealthBar.classList.remove('flash-health-bar');
        }, 200); // Match the duration of attack animation

        checkGameOver();
    }

    function block(playerId) {
        console.log(`${playerId} is blocking!`);
        // Implement basic blocking logic
        // For example, reduce incoming damage or prevent attacks
    }

    function checkGameOver() {
        if (player1Health <= 0 || player2Health <= 0) {
            console.log('Game Over!');
            
            // Hide the game arena and show the game over screen
            document.querySelector('#game-arena').classList.add('hidden');
            const gameOverScreen = document.querySelector('#game-over');
            if (gameOverScreen) {
                gameOverScreen.classList.remove('hidden');
    
                // Set player names
                const player1Name = 'Gojira';
                const player2Name = 'Megalodon';
    
                // Determine winner and loser messages
                const winnerMessage = player1Health <= 0 ? `${player2Name} WINS, We pouring honey on you GOAT!` : `${player1Name} WINS, We pouring honey on you GOAT!`;
                const loserMessage = player1Health <= 0 ? `${player1Name} YIKES, hope you got healthcare...` : `${player2Name} YIKES, hope you got healthcare...`;
    
                // Update message elements
                const winnerMessageElement = gameOverScreen.querySelector('#winner-message');
                const loserMessageElement = gameOverScreen.querySelector('#loser-message');
                if (winnerMessageElement) winnerMessageElement.textContent = winnerMessage;
                if (loserMessageElement) loserMessageElement.textContent = loserMessage;

            // Stop AI attacks
            clearInterval(attackInterval);
            }
        }
    }

    function startAIAttack() {
        console.log('Starting AI attack...');
        attackInterval = setInterval(() => {
            if (player1Health > 0 && player2Health > 0) {
                attack('#player2', '#player1');
            }
        }, 3000); // Adjust attack interval as needed
    }

    // Add restart button functionality
    document.querySelector('#restart-btn').addEventListener('click', () => {
        // Reset player health
        player1Health = 100;
        player2Health = 100;

        // Hide game over screen and show start screen
        document.querySelector('#game-over').classList.add('hidden');
        document.querySelector('#start-screen').classList.remove('hidden');

        // Reset player positions if necessary
        const player1 = document.querySelector('#player1');
        const player2 = document.querySelector('#player2');
        if (player1) player1.style.left = '0px';
        if (player2) player2.style.left = 'calc(100% - 400px)'; // Adjust based on player width
    });
});
