import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
let gameField = Array(100).fill('_');

const gamePlay = document.querySelector('.game-play');
const playerTurnDisplay = document.querySelector('.player');

function handleButtonClick(event) {
  const btn = event.target;
  if (!btn.classList.contains('button-clicked')) {
    const cellIndex = Array.from(btn.parentNode.children).indexOf(btn);
    if (currentPlayer === 'circle') {
      btn.classList.add('game-play--circle');
      gameField[cellIndex] = 'o';
      currentPlayer = 'cross';
    } else {
      btn.classList.add('game-play--cross');
      gameField[cellIndex] = 'x';
      currentPlayer = 'circle';
    }
    btn.classList.add('button-clicked');
    updatePlayerTurnDisplay();
    const winner = findWinner(gameField);
    if (winner === 'o' || winner === 'x') {
      setTimeout(() => {
        alert(`Player ${winner} wins!`);
        location.reload();
      }, 500)

      gamePlay.style.pointerEvents = 'none';
      gamePlay.classList.add('winner-declared');
    } else if (winner === 'tie') {
      setTimeout(() => {
        alert('The game ended in a tie!');
        location.reload();
      }, 500)
      gamePlay.style.pointerEvents = 'none';
      gamePlay.classList.add('winner-declared');
    }
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
