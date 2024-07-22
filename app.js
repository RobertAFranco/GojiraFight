document.addEventListener("DOMContentLoaded", () => {
    let player1Health = 100;
    let player2Health = 100;
    let attackInterval; 
    let isBlocking = false; 
  
    initializeStartScreen();
  
    function startGame() {
      console.log("Starting game...");
      document.querySelector("#start-screen").classList.add("hidden");
      document.querySelector("#game-arena").classList.remove("hidden");
      initializeGame();
    }
  
    function initializeStartScreen() {
      const startButton = document.querySelector("#start-game-btn");
      if (startButton) {
        console.log("Start button found.");
        startButton.addEventListener("click", startGame);
      } else {
        console.error("Start button not found");
      }
    }
  
    function initializeGame() {
      console.log("Initializing game...");
      updateHealthBars(); 
  
      
      document.addEventListener("keydown", handleKeyPress);
      document.addEventListener("keyup", handleKeyUp);
  
      // Start AI attacks chat gpt was needed
      startAIAttack();
    }
  
    function updateHealthBars() {
      console.log("Updating health bars...");
      const player1HealthBar = document.querySelector("#player1-health");
      const player2HealthBar = document.querySelector("#player2-health");
  
      const maxHealth = 100;
      const player1HealthPercentage = (player1Health / maxHealth) * 100;
      const player2HealthPercentage = (player2Health / maxHealth) * 100;
  
      if (player1HealthBar) { //chat gpt helped
        player1HealthBar.style.width = `${player1HealthPercentage / 2 - 5}%`;
      }
      if (player2HealthBar) {
        player2HealthBar.style.width = `${player2HealthPercentage / 2 - 5}%`;
      }
    }
  
    function getPlayer2Position() {
      const player2 = document.querySelector("#player2");
      if (!player2) return null;
  
      const rect = player2.getBoundingClientRect();
      const arena = document.querySelector("#game-arena").getBoundingClientRect();
  

      return {
        left: rect.left - arena.left,
        right: rect.right - arena.left,
      };
    }
  
    function handleKeyPress(e) {
      console.log(`Key pressed: ${e.key}`);
      switch (e.key) {
        case ",":
          moveCharacter("#player1", -5); 
          break;
        case ".":
          moveCharacter("#player1", 5); 
          break;
        case " ":
          jump("#player1"); 
          break;
        case "a":
          attack("#player1", "#player2"); 
          break;
        case "s":
          block("#player1"); 
          break;
      }
    }
  
    function moveCharacter(playerId, dx) {
      const character = document.querySelector(playerId);
      if (!character) return; 
  
      const rect = character.getBoundingClientRect();
      const arena = document.querySelector("#game-arena").getBoundingClientRect();
  
    
      const player2Position = getPlayer2Position();
      if (!player2Position) return;
      let newLeft;
    
      if (dx == 5) newLeft = rect.left - arena.left + dx;
      else newLeft = rect.left - arena.left - 50;
  
      // chat gpt helped
      newLeft = Math.max(0, Math.min(player2Position.left - rect.width, newLeft));
  
      
      if (dx == 5) character.style.left = `${newLeft}px`;
      else character.style.left = `${newLeft > 0 ? newLeft : 0}px`;
    }
  
    function playerJump(player) {
      const jumpHeight = 5; 
  
    
      const rect = player.getBoundingClientRect();
      const arenaRect = document
        .querySelector("#game-arena")
        .getBoundingClientRect();
  
      // chat gpt helped contain the jump
      const initialBottom = rect.bottom - arenaRect.top;
  
      
      const peakBottom = initialBottom + jumpHeight;
  
    
      player.style.bottom = `${peakBottom}px`;
    }
    function jump(playerId) {
      const jumpDuration = 200;
  
      const player = document.querySelector(playerId);
      if (!player) return; 
  
      playerJump(player);
      
      setTimeout(() => {
        playerJump(player);
      }, jumpDuration);
    }
  
    function attack(attackerId, defenderId) {
      console.log(`${attackerId} attacks ${defenderId}!`);
      // Calculate damage
      const damage = 10;
      if (attackerId === "#player1") {
        player2Health -= damage;
        if (player2Health < 0) player2Health = 0;
        const player2 = document.querySelector("#player2");
        if (player2) {
          player2.classList.add("attack-animation"); 
        }
      } else if (attackerId === "#player2") {
        player1Health -= damage;
        if (player1Health < 0) player1Health = 0;
        const player1 = document.querySelector("#player1");
        if (player1) {
          player1.classList.add("attack-animation"); 
        }
      }
  
      // Update health bars chat gpt helped here
      updateHealthBars();
  
      const defenderHealthBar = document.querySelector(`${defenderId}-health`);
      if (defenderHealthBar) {
        defenderHealthBar.classList.add("flash-health-bar");
      }
  
      setTimeout(() => {
        const player1 = document.querySelector("#player1");
        const player2 = document.querySelector("#player2");
        if (player1) player1.classList.remove("attack-animation");
        if (player2) player2.classList.remove("attack-animation");
        if (defenderHealthBar)
          defenderHealthBar.classList.remove("flash-health-bar");
      }, 200); 
  
      checkGameOver();
    }
  
    function block(playerId) {
      console.log(`${playerId} is blocking!`);
      isBlocking = true; // chat gpt for block
      const player = document.querySelector(playerId);
      if (player) {
        player.classList.add("block-animation"); 
      }
    }
  
    function handleKeyUp(e) {
      if (e.key === "s") {
        isBlocking = false; // Stop blocking when 's' is released
        const player1 = document.querySelector("#player1");
        if (player1) {
          player1.classList.remove("block-animation");
        }
      }
    }
  
    function checkGameOver() {
      if (player1Health <= 0 || player2Health <= 0) {
        console.log("Game Over!");
  
        document.querySelector("#game-arena").classList.add("hidden");
        const gameOverScreen = document.querySelector("#game-over");
        if (gameOverScreen) {
          gameOverScreen.classList.remove("hidden");
  
          
          const player1Name = "Gojira";
          const player2Name = "Megalodon";
  
          
          const winnerMessage =
            player1Health <= 0
              ? `${player2Name} WINS, We pouring honey on you GOAT!`
              : `${player1Name} WINS, We pouring honey on you GOAT!`;
          const loserMessage =
            player1Health <= 0
              ? `${player1Name} YIKES, hope you got healthcare...`
              : `${player2Name} YIKES, hope you got healthcare...`;
  
          
          const winnerMessageElement =
            gameOverScreen.querySelector("#winner-message");
          const loserMessageElement =
            gameOverScreen.querySelector("#loser-message");
          if (winnerMessageElement)
            winnerMessageElement.textContent = winnerMessage;
          if (loserMessageElement) loserMessageElement.textContent = loserMessage;
  
          // Stop AI attacks
          clearInterval(attackInterval);
        }
      }
    }
  
    function startAIAttack() {
      console.log("Starting AI attack...");
      attackInterval = setInterval(() => {
        if (player1Health > 0 && player2Health > 0) {
          if (!isBlocking) {
            attack("#player2", "#player1");
          } else {
            console.log("Player is blocking. AI attack missed!");
          }
        }
      }, 3000); 
    }
  
    document.querySelector("#restart-btn").addEventListener("click", () => {
      player1Health = 100;
      player2Health = 100;
  
      isBlocking = false; 
  
      document.querySelector("#game-over").classList.add("hidden");
      document.querySelector("#start-screen").classList.remove("hidden");
  
      
      const player1 = document.querySelector("#player1");
      const player2 = document.querySelector("#player2");
      if (player1) player1.style.left = "0px";
      if (player2) player2.style.left = "calc(100% - 400px)"; 
    });
  });
  

