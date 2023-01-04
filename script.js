const xButton = document.querySelector("#x");
const yButton = document.querySelector("#y");



//module pattern
const Gameboard = (() => {
    let cells = document.querySelectorAll(".cell");

    const getCellList = () => cells;
    const getAvailableCells = () => {
        let availableCells = [];
        for (const cell in cells) {
            if (cells[cell].textContent === '') {
                availableCells.push(cell);
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

    const isXTurn = () => {
        return turn % 2 === 1;
    }
    return {
        getTurn, isXTurn, incrementTurn, isEmpty, isHorizontalWin, isVerticalWin, isDiagonalWin, isGameOver

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

    if (GameLogic.isGameOver() === true) {
        alert(" game done!")
        this.disabled();

    }
    if (GameLogic.isXTurn() && GameLogic.isEmpty(cell)) {
        cell.textContent = 'X';
        GameLogic.incrementTurn();
        console.log(Gameboard.getAvailableCells());
    } else if (!GameLogic.isXTurn() && GameLogic.isEmpty(cell)) {
        cell.textContent = "O";
        GameLogic.incrementTurn();
        console.log(Gameboard.getAvailableCells());
    } else {
        alert("No Way! Spot Already Taken!")
    }
    if (GameLogic.isHorizontalWin(Gameboard.getCellList())) {
        console.log(("horizontal win!"))
        alert("horizontal win")
    } else if (GameLogic.isVerticalWin(Gameboard.getCellList())) {
        console.log(("vertical win!"))
        alert("vertical win")
    } else if (GameLogic.isDiagonalWin(Gameboard.getCellList())) {
        console.log(("diagonal win!"))
        alert("diagonal win")
    }
}))
