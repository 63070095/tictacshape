const cells = document.querySelectorAll('.cell');
const turnText = document.getElementById('turn');
const resetButton = document.getElementById('reset');
const board = [];
const size = 7;
let turn = 'X';

// Initialize board array with empty strings
for (let i = 0; i < size; i++) {
    board.push(Array(size).fill(''));
}

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
        cell.textContent = turn;

        // Check for win
        if (checkWin()) {
            turnText.textContent = `${turn} wins!`;
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
        turn = turn === 'X' ? 'O' : 'X';
        turnText.textContent = `It's ${turn}'s turn`;
    });
});

// Add click event listener to reset button
resetButton.addEventListener('click', () => {
    // Reset board array and cell text
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            board[i][j] = '';
            cells[i * size + j].textContent = '';
            cells[i * size + j].classList.remove('x', 'o');
            cells[i * size + j].removeAttribute('disabled');
        }
    }

    // Reset turn and turn text
    turn = 'X';
    turnText.textContent = `It's ${turn}'s turn`;
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
    if (type === 'row') {
        for (let i = 0; i < size; i++) {
            const cell = cells[index * size + i];
            cell.classList.add(forward ? 'x' : 'o');
        }
    } else if (type === 'diagonal') {
        if (forward) {
            for (let i = 0; i < size; i++) {
                const cell = cells[i * size + i];
                cell.classList.add('x');
            }
        } else {
            for (let i = 0; i < size; i++) {
                const cell = cells[i * size + (size - i - 1)];
                cell.classList.add('o');
            }
        }
    }
}