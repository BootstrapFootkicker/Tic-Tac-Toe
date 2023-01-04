const xButton = document.querySelector("#x");
const yButton = document.querySelector("#o");


//module pattern
const Gameboard = (() => {
    let cells = document.querySelectorAll(".cell");

    const getCellList = () => cells;
    const getAvailableCells = () => {
        let availableCells = [];
        for (const cell in cells) {
            if (cells[cell].textContent === '') {
                availableCells.push(cells[cell]);
            }
        }
        return availableCells;
    }
    return {
        getCellList, getAvailableCells

    };
})();

//module pattern
const GameLogic = (() => {
    let turn = 1;
    let gameOver = false;

    const getTurn = () => turn;
    const incrementTurn = () => {
        turn += 1;
    }
    const isEmpty = (cell) => {
        return cell.textContent === ''
    }
    const isGameOver = () => gameOver;
    const isHorizontalWin = (nodelist) => {
        if (nodelist[0].textContent === nodelist[1].textContent &&
            nodelist[1].textContent === nodelist[2].textContent && nodelist[0].textContent !== '') {
            gameOver = true;
            return true;
        } else if (nodelist[3].textContent === nodelist[4].textContent &&
            nodelist[4].textContent === nodelist[5].textContent && nodelist[3].textContent !== '') {
            gameOver = true;
            return true;
        } else if (nodelist[6].textContent === nodelist[7].textContent &&
            nodelist[7].textContent === nodelist[8].textContent && nodelist[6].textContent !== '') {
            gameOver = true;
            return true;
        }
    }
    const isVerticalWin = (nodelist) => {
        if (nodelist[0].textContent === nodelist[3].textContent &&
            nodelist[3].textContent === nodelist[6].textContent && nodelist[0].textContent !== '') {
            gameOver = true
            return true;
        } else if (nodelist[1].textContent === nodelist[4].textContent &&
            nodelist[4].textContent === nodelist[7].textContent && nodelist[1].textContent !== '') {
            gameOver = true
            return true;
        } else if (nodelist[2].textContent === nodelist[5].textContent &&
            nodelist[5].textContent === nodelist[8].textContent && nodelist[2].textContent !== '') {
            gameOver = true
            return true
        }


    }
    const isDiagonalWin = (nodelist) => {
        if (nodelist[0].textContent === nodelist[4].textContent &&
            nodelist[4].textContent === nodelist[8].textContent && nodelist[0].textContent !== '') {
            gameOver = true
            return true;
        } else if (nodelist[6].textContent === nodelist[4].textContent &&
            nodelist[4].textContent === nodelist[2].textContent && nodelist[6].textContent !== '') {
            gameOver = true
            return true
        }


    }
    const isWin = (nodelist) => {
        if (isDiagonalWin(nodelist) === true || isVerticalWin(nodelist) === true || isHorizontalWin(nodelist) === true) {
            return true;
        }
    }
    const disableBoard = (nodelist) => {
        for (const node in nodelist) {
            nodelist[node].disabled();
        }
    }
    const enableBoard = (nodelist) => {
        for (const node in nodelist) {
            nodelist[node].disabled = false;
        }
    }

    const isPlayerTurn = (playerSign) => {
        if (playerSign === 'X' && (turn % 2) === 1) {
            return true
        } else return playerSign === 'O' && turn % 2 === 0;

    }
    return {
        getTurn,
        isPlayerTurn,
        incrementTurn,
        isEmpty,
        isHorizontalWin,
        isVerticalWin,
        isDiagonalWin,
        isGameOver,
        enableBoard,
        disableBoard,
        isWin

    };
})
();

//Factory Function
const Player = (name) => {
    let playerSign = "X";
    const getName = () => name;
    const setPlayerSign = (sign) => {
        playerSign = sign

    }
    const getPlayerSign = () => playerSign

    return {
        getName, getPlayerSign, setPlayerSign
    }
}
let boot = Player('Boot');
xButton.addEventListener('click', () => boot.setPlayerSign('X'));
yButton.addEventListener('click', () => boot.setPlayerSign('Y'));


//game-board event
let cellNodeList = Gameboard.getCellList();
cellNodeList.forEach(cell => cell.addEventListener('click', () => {
    console.log(GameLogic.getTurn())
    if (GameLogic.isGameOver() === true) {
        this.disabled();
        alert(" game done!")


    }
    if (GameLogic.isPlayerTurn(boot.getPlayerSign()) === true && GameLogic.isEmpty(cell) === true) {
        // GameLogic.enableBoard(Gameboard.getCellList())
        cell.textContent = boot.getPlayerSign();
        GameLogic.incrementTurn();
        let computerChoice = Gameboard.getAvailableCells();
        let randNum = Math.floor(Math.random() * computerChoice.length);
        //alert(computerChoice[randNum]);
        //GameLogic.disableBoard(Gameboard.getCellList());


        if (!GameLogic.isWin(Gameboard.getCellList())) {
            setTimeout(() => computerChoice[randNum].textContent = "O", 500);

        }
        GameLogic.incrementTurn();

        // } else if (GameLogic.isPlayerTurn(boot.getPlayerSign()) === false) {
        //
        //     let computerChoice = Gameboard.getAvailableCells();
        //     let randNum = Math.floor(Math.random() * computerChoice.length);
        //     alert(computerChoice[randNum]);
        //     //GameLogic.disableBoard(Gameboard.getCellList());
        //     computerChoice[randNum].textContent = "O"
        //     GameLogic.incrementTurn();
        //
        //
    } else {
        alert("No Way! Spot Already Taken!")
    }
    if (GameLogic.isWin(Gameboard.getCellList())) {
        console.log((" win!"))
        alert("win win")
    }
}))
