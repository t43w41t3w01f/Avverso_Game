document.addEventListener('DOMContentLoaded', () => {
    const size = 6; // Größe des Spielbretts
    const board = Array.from({ length: size }, () => Array.from({ length: size }, () => null));
    let currentPlayer = 'X'; // 'X' für Spieler 1, 'O' für Spieler 2
    const gameBoard = document.getElementById('game-board');

    // Funktion zum Erstellen des Spielbretts
    function createBoard() {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => makeMove(row, col));
                gameBoard.appendChild(cell);
            }
        }
    }

    // Funktion zum Ausführen eines Zuges
    function makeMove(row, col) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.textContent = currentPlayer;
            cell.classList.add(`player-${currentPlayer}`);
            if (checkWin(row, col)) {
                alert(`Spieler ${currentPlayer} gewinnt!`);
                resetGame();
            } else if (checkDraw()) {
                alert("Unentschieden!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    // Funktion zum Überprüfen auf einen Gewinn
    function checkWin(row, col) {
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (const [dx, dy] of directions) {
            let count = 1;
            for (let i = 1; i < 4; i++) {
                const newRow = row + dx * i;
                const newCol = col + dy * i;
                if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size &&
                    board[newRow][newCol] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }
            for (let i = 1; i < 4; i++) {
                const newRow = row - dx * i;
                const newCol = col - dy * i;
                if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size &&
                    board[newRow][newCol] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 4) {
                return true;
            }
        }
        return false;
    }

    // Funktion zum Überprüfen auf ein Unentschieden
    function checkDraw() {
        return board.every(row => row.every(cell => cell));
    }

    // Funktion zum Zurücksetzen des Spiels
    function resetGame() {
        board.forEach(row => row.fill(null));
        currentPlayer = 'X';
        gameBoard.innerHTML = '';
        createBoard();
    }

    // Initialisiere das Spielbrett
    createBoard();
});
