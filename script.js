const cells = document.querySelectorAll('.cell');
const turnText = document.getElementById('turn');
const resetButton = document.getElementById('reset');
const board = [];
const size = 5;
let turn = '1'; // set initial turn to player 1
let xChesses = ['X', 'Y'];
let oChesses = ['O', 'Z'];
let xChess = getRandomChess(xChesses);
let oChess = getRandomChess(oChesses);

// Initialize game
function initialize() {
    // Initialize board array with empty strings
    for (let i = 0; i < size; i++) {
        board.push(Array(size).fill(''));
    }

    // Update turn text and chess display
    turnText.textContent = `It's player ${turn}'s turn`;
    updateChessDisplay();

    // Add click event listener to each cell
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            const row = cell.parentNode.rowIndex;
            const col = cell.cellIndex;

            // If cell is already filled, return
            if (board[row][col] !== '') {
                return;
            }

            // Update board and cell text
            board[row][col] = turn;
            cell.textContent = turn === '1' ? xChess : oChess;

            // Check for win
            if (checkWin()) {
                turnText.textContent = `Player ${turn} wins!`;
                disableCells();
                return;
            }

            // Check for tie
            if (checkTie()) {
                turnText.textContent = "It's a tie!";
                disableCells();
                return;
            }

            // Switch turns
            turn = turn === '1' ? '2' : '1';
            turnText.textContent = `It's player ${turn}'s turn`;

            // Update chess display
            updateChessDisplay();
        });
    });
}

// Update chess display
function updateChessDisplay() {
    if (turn === '1') {
        xChess = getRandomChess(xChesses);
        document.getElementById('chess').textContent = `Player 1's chess is: ${xChess}`;
    } else {
        oChess = getRandomChess(oChesses);
        document.getElementById('chess').textContent = `Player 2's chess is: ${oChess}`;
    }
}
// Get a random chess from the given array of chesses
function getRandomChess(chesses) {
    return chesses[Math.floor(Math.random() * chesses.length)];
}

// Add click event listener to reset button
resetButton.addEventListener('click', () => {
    // Reset board array and cell text
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            board[i][j] = '';
            cells[i * size + j].textContent = '';
            cells[i * size + j].removeAttribute('disabled');
        }
    }

    // Randomly select chess for players
    xChess = getRandomChess(['X', 'Y']);
    oChess = getRandomChess(['O', 'Z']);

    // Reset turn and turn text
    turn = '1';
    turnText.textContent = `It's player ${turn}'s turn`;

    // Update chess display
    updateChessDisplay();
});


// Check for win
function checkWin() {
    // Check rows and columns
    for (let i = 0; i < size; i++) {
        if (board[i].every((cell) => cell === turn) || board.every((row) => row[i] === turn)) {
            highlightWin(i, 'row', board[i].every((cell) => cell === turn));
            return true;
        }
    }

    // Check diagonals
    if (board.every((row, i) => row[i] === turn) || board.every((row, i) => row[size - i - 1] === turn)) {
        highlightWin(0, 'diagonal', board.every((row, i) => row[i] === turn));
        return true;
    }

    return false;
}

// Check for tie
function checkTie() {
    return board.every((row) => row.every((cell) => cell !== ''));
}

// Disable cells after game ends
function disableCells() {
    cells.forEach((cell) => cell.setAttribute('disabled', true));
}

// Highlight winning cells
function highlightWin(index, type, forward) {
    const winClass = forward ? 'x' : 'o';
    const winChess = forward ? 'X' : 'O';
    const winChess2 = forward ? 'Y' : 'Z';

    if (type === 'row') {
        for (let i = 0; i < size; i++) {
            const cell = cells[index * size + i];
            cell.classList.add(winClass);
            if (board[index][i] === winChess2) {
                cell.textContent = winChess2;
            } else {
                cell.textContent = winChess;
            }
        }
    } else if (type === 'diagonal') {
        if (forward) {
            for (let i = 0; i < size; i++) {
                const cell = cells[i * size + i];
                cell.classList.add(winClass);
                if (board[i][i] === winChess2) {
                    cell.textContent = winChess2;
                } else {
                    cell.textContent = winChess;
                }
            }
        } else {
            for (let i = 0; i < size; i++) {
                const cell = cells[i * size + (size - i - 1)];
                cell.classList.add(winClass);
                if (board[i][size - i - 1] === winChess2) {
                    cell.textContent = winChess2;
                } else {
                    cell.textContent = winChess;
                }
            }
        }
    }
}

initialize();
