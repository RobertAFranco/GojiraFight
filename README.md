# GojiraFight

Street fighter style game with Godzilla and other monsters.

![gojiraa fight game](https://github.com/user-attachments/assets/9ecac31b-c9a9-4f55-8e81-d4846c684b2f)

## MVP User Stories with Pseudocode

### Character Selection:

As a player, I want to select a character from a list of available fighters (2 minimum) so that I can play the game with my preferred hero or villain. 

>```// Display the list of available characters
>function displayCharacterSelectionScreen() {
>    for each character in characterList {
>       show character.image and character.name
>    }
>    // Add an event listener for selecting a character
>    addEventListener('click', onCharacterSelect);
>}
> function onCharacterSelect(selectedCharacter) {
>    playerCharacter = selectedCharacter;
>   loadGameScreen();
>}

### Basic Movement:

As a player, I want to control my character's movement using the keyboard (e.g., arrow keys for movement and spacebar for jumping) so that I can navigate the game arena effectively.

> ```// Initialize player movement controls
> function initializeControls() {
>    addEventListener('keydown', onKeyDown);
>    addEventListener('keyup', onKeyUp);
>}
> function onKeyDown(event) {
>    switch (event.key) {
>       case 'ArrowLeft':
>            moveCharacterLeft(playerCharacter);
>            break;
>        case 'ArrowRight':
>            moveCharacterRight(playerCharacter);
>            break;
>        case 'Space':
>            makeCharacterJump(playerCharacter);
>            break;
>        // Add other key controls if necessary
>    }
>}
>function onKeyUp(event) {
>    // Stop movement if necessary
>}
>// Functions to handle character movement
>function moveCharacterLeft(character) {
>// Code to move character left
>}
>function moveCharacterRight(character) {
>    // Code to move character right
>}
>function makeCharacterJump(character) {
>    // Code to make character jump
>}

### Attacking and Defending:

As a player, I want to execute basic attacks, defense, and maybe special attacks (e.g., 'A' for punch, 'S' for kick, 'B' for block) so that I can engage in combat with the opponent.

>```// Initialize attack and defense controls
>function initializeAttackControls() {
>    addEventListener('keydown', onAttackKeyDown);
>}
>function onAttackKeyDown(event) {
>    switch (event.key) {
>        case 'A':
>            executePunch(playerCharacter);
>            break;
>        case 'S':
>            executeKick(playerCharacter);
>            break;
>        // Add other attack moves if necessary
>    }
>}
>// Functions to handle attacks
>function executePunch(character) {
>    // Code to execute punch move
>}
>function executeKick(character) {
>    // Code to execute kick move
>}

### Health and Game Over:

As a player, I want to see a health bar for both my character and the opponent so that I can track the progress of the fight and know when the game is over if my character’s health reaches zero.

> ```// Initialize health bars
> function initializeHealthBars() {
>    playerHealth = MAX_HEALTH;
>    opponentHealth = MAX_HEALTH;
>    updateHealthDisplay();
> }
>
> // Update health display
> function updateHealthDisplay() {
>   display(playerHealthBar, playerHealth);
>    display(opponentHealthBar, opponentHealth);
> }
>
> function checkGameOver() {
>   if (playerHealth <= 0) {
>        displayGameOverScreen("You Lose!");
>    } else if (opponentHealth <= 0) {
>       displayGameOverScreen("You Win!");
>    }
> }
>
> // Display game over screen
> function displayGameOverScreen(message) {
>    show message;
>    show restartButton;
> }

### Winning and Losing Feedback:

As a player, I want to receive feedback on the outcome of the match (e.g., a "You Win!" or "You Lose!" message) and be able to restart the game or return to the character selection screen so that I can either continue playing or start a new game.

> ```// Handle game restart or return to character selection
> function handleGameOverActions(action) {
>    switch (action) {
>       case 'restart':
>           resetGame();
>            break;
>       case 'returnToSelection':
>           displayCharacterSelectionScreen();
>           break;
>    }
>}
>function resetGame() {
>    initializeHealthBars();
>  loadGameScreen();
> }
> // Example of a button click event handler
> function onRestartButtonClick() {
>    handleGameOverActions('restart');
> }
>
> function onReturnToSelectionButtonClick() {
>    handleGameOverActions('returnToSelection');
> }

## HTML (Structure)
HTML is used to define the structure and content of the game. It includes elements such as the game container, character selection menu, health bars, and buttons.

- Game Container: The main area where the game is rendered.
- Character Selection Screen: A section to display available characters and their images.
- Health Bars: Elements to show player and opponent health.
- Game Over Screen: A section to display messages like "You Win!" or "You Lose!" and provide buttons for restarting or returning to character selection.

## CSS (Styling)
CSS is used to style the game elements, including the layout of the game area, health bars, and character sprites.

- Game Layout: Styling for the game container, character positions, and arena.
- Health Bars: Styling for the appearance of health bars.
- Character Sprites: CSS to handle positioning and animation of character sprites.
- Game Over Screen: Styling for the game over message and buttons.

## JavaScript (Functionality)
JavaScript handles the dynamic behavior of the game, including user interactions, game logic, and animations.

- Character Selection: JavaScript to handle the selection of characters and load the game.
- Movement: Code to control character movement based on keyboard inputs.
- Attacking and Defending: Functions to manage attacks, special moves, and defenses.
- Health Management: Logic to update health bars and check game-over conditions.
- Game Over Logic: Code to display the game over screen and handle user actions like restarting or returning to the character selection screen.

## Stretch Goals
 - More characters with customization, move moves with special attacks, move animations, more enironments with extra danger and damage.

## Timeline
 - 7/13-14: HTML on main screen, arena, character selection, healthbars, Victory and Defeat announcements. .
 - 7/15:  Work on CSS basic design layout of game, character blocking, healthbar blocking, arena setting, start buttons.
 - 7/16: Javascript on character and loading the game beginning animations and further character select animations.
 - 7/17: Javascript on character and function attacks/blocks/movement.
 - 7/18: Define attacks and blocks further and incorparate with health bar. Creat end of game and restart to selection screen.
 - 7/19: CSS character animation and word announcenments.
 - 720-21: Fine tune styling, any design flaws, any missing animations, and cleaner styling design.

![gojiraa-2](https://github.com/user-attachments/assets/330e8890-3870-43b0-8d41-fbae21ade288)




