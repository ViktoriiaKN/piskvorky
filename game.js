import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
let gameField = Array(100).fill('_');

const gamePlay = document.querySelector('.game-play');

function handleButtonClick(event) {
  const btn = event.target;
  if (!btn.classList.contains('button-clicked')) {
    const cellIndex = Array.from(btn.parentNode.children).indexOf(btn);
    if (currentPlayer === 'circle') {
      btn.classList.add('game-play--circle');
      gameField[cellIndex] = 'o';
      currentPlayer = 'cross';
      checkAndPlayAI(); // Checking and playing AI after each user's move Перевірка та гра AI після кожного ходу користувача
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

async function checkAndPlayAI() {
  if (currentPlayer === 'cross') {
    const response = await fetch(
      'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          board: gameField, // Sending the current state of the field Передача поточного стану поля
          player: 'x', // Looking for a move for the cross Шукаємо хід для хрестика
        }),
      }
    );
    const data = await response.json();
    const {position: {x, y}} = data;
    const index = x + y * 10;
    const button = document.querySelectorAll('.button')[index];
    button.click(); // Simulate a click on the corresponding field button Симуляція кліку на відповідному кнопці поля
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
