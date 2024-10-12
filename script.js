const playerFactory = (name, mark) => {
    const playTurn = (board, cell) => {
        const id = board.cells.findIndex(position => position === cell);

        if (board.boardArray[id] === '') {
            board.render();
            return id;
        };
        return null;
    };
    return { name, mark, playTurn };
};

const gameBoard = (() => {
    
    /* const player1 = player("Player X", "X");
    const player2 = player("Player O", "O"); */

    const gBoard = document.querySelector('.board-container');
    const cells = Array.from(document.querySelectorAll('.cell'));

    let boardArray = ['', '', '', '', '', '', '', '', ''];
    let winningCombo = [];
    let turns = 0;
    let winner = null;

    /* const player = (name, symbol) => {
        return {name, symbol};
    }; */

    const render = () => {
        boardArray.forEach((mark, id) => {
            cells[id].textContent = boardArray[id];
        });
    };

    const checkWin = () => {
        const winCombos = [
            [0,1,2],
            [0,3,6],
            [3,4,5],
            [6,7,8],
            [1,4,7],
            [2,4,6],
            [2,5,8],
            [0,4,8],
        ];

        winCombos.forEach((combo) => {
            if (boardArray[combo[0]] && boardArray[combo[0]] === boardArray[combo[1]] && boardArray[combo[0]] === boardArray[combo[2]]) {
                winner = 'current';
            };
        });

        return winner || (boardArray.includes('') ? null : 'Tie');
    };

    const resetGame = () => {
        boardArray = ['', '', '', '', '', '', '', '', ''];
    };

    return {
        render, gBoard, cells, boardArray, checkWin, resetGame,
    };

})();

const gamePlay = (() => {
    const playerOneName = document.querySelector('#player1');
    const playerTwoName = document.querySelector('#player2');
    const form = document.querySelector('.player-info');
    const resetBtn = document.querySelector('#reset');
    
    let currentPlayer;
    let playerOne;
    let playerTwo;

    const switchTurn = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    const gameRound = () => {
        const board = gameBoard;
        const gameStatus = document.querySelector('.game-status');

        if (currentPlayer.name !== '') {
            gameStatus.textContent = `${currentPlayer.name}'s turn`;
        } else { 
            gameStatus.textContent = 'Board: ';
        }

        board.gBoard.addEventListener('click', (event) => {
            event.preventDefault();
            const play = currentPlayer.playTurn(board, event.target);

            if (play !== null) {
                board.boardArray[play] = `${currentPlayer.mark}`;
                board.render();
                const winStatus = board.checkWin();

                if (winStatus === 'Tie') {
                    gameStatus.textContent = 'Tie!';
                } else if (winStatus === null) {
                    switchTurn();
                    gameStatus.textContent = `${currentPlayer.name}'s turn`;
                } else {
                    gameStatus.textContent = `Winner is ${currentPlayer.name}!`;
                    board.resetGame();
                    board.render();
                }
            }
        });
    };

    const gameInit = () => {
        if (playerOneName.value !== '' && playerTwoName.value !== '') {
            playerOne = playerFactory(playerOneName.value, 'X');
            playerTwo = playerFactory(playerTwoName.value, 'O');
            currentPlayer = playerOne;
            gameRound();
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (playerOneName.value !== '' && playerTwoName.value !== '') {
            gameInit();
            form.classList.add('hidden');
            document.querySelector('.place').classList.remove('hidden');
        } else {
            window.location.reload();
        }
    });

    resetBtn.addEventListener('click', () => {
        document.querySelector('.game-status').textContent = 'Board: ';
        document.querySelector('#player1').value = '';
        document.querySelector('#player2').value = '';
        window.location.reload();
    });

    return {
        gameInit,
    };

})();

gamePlay.gameInit();

/* let myGameBoard = [
    {board: 1, value: ""},
    {board: 2, value: ""},
    {board: 3, value: ""},
    {board: 4, value: ""},
    {board: 5, value: ""},
    {board: 6, value: ""},
    {board: 7, value: ""},
    {board: 8, value: ""},
    {board: 9, value: ""},
]; */