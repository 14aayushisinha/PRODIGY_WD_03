let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

function handleMove(cellIndex) {
  if (gameBoard[cellIndex] === '' && gameActive) {
    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].innerText = currentPlayer;
    checkWinner();
    togglePlayer();
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerText = `${currentPlayer}'s Turn`;
}

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      statusDisplay.innerText = `${gameBoard[a]} Wins!`;
      gameActive = false;
      highlightWinningCombo(combo);
      return;
    }
  }
  if (!gameBoard.includes('')) {
    statusDisplay.innerText = "It's a Draw!";
    gameActive = false;
  }
}

function highlightWinningCombo(combo) {
  for (let index of combo) {
    cells[index].classList.add('win');
  }
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusDisplay.innerText = `${currentPlayer}'s Turn`;
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('win');
  });
}