let currentPlayer = 'circle';

const gamePlay = document.querySelector('.game-play');
const playerTurnDisplay = document.querySelector('.player');

function handleButtonClick(event) {
  const btn = event.target;
  if (!btn.classList.contains('button-clicked')) {
    if (currentPlayer === 'circle') {
      btn.classList.add('game-play--circle');
      currentPlayer = 'cross';
    } else {
      btn.classList.add('game-play--cross');
      currentPlayer = 'circle';
    }
    btn.classList.add('button-clicked');{""}
    updatePlayerTurnDisplay();
    this.blur();
  }
}

function updatePlayerTurnDisplay() {
  const playerImage = document.querySelector('.player-image');
  playerImage.src = `./svg/${currentPlayer}.svg`;
  playerImage.alt = currentPlayer;
}

document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// Updating the display of the current player after the page is loaded Оновлення відображення поточного гравця після завантаження сторінки
updatePlayerTurnDisplay();

// BONUS

const restart = document.querySelector('.restart');
restart.addEventListener('click', (e) => {
  const confirmed = confirm('Are you sure you want to restart the game?');
  if (!confirmed) {
    e.preventDefault(); 
  } else {
    console.log('Restarting the game...');
  }
});

