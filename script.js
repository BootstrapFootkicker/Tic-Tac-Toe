const xButton = document.querySelector("#x");
const oButton = document.querySelector("#o");
const overlay = document.querySelector('#overlay');


//module pattern
const Gameboard = (() => {
    let cells = document.querySelectorAll(".cell");
    const getCellList = () => cells;
    const getAvailableCells = () => {
        let availableCells = [];
        for (const cell in cells) {
            if (cells[cell].textContent === '') {
                console.log(cells[cell])
                availableCells.push(cells[cell]);
                //reason for error
            }

        }
        return availableCells;
    }
    const clearBoard = (nodelist) => {
        GameLogic.setTurn(1);
        GameLogic.setGameOver(false)
        overlay.textContent = ''
        for (const node in nodelist) {
            nodelist[node].textContent = "";
        }

    }

    return {
        getCellList, getAvailableCells, clearBoard

    };
})();

//module pattern
const GameLogic = (() => {
    let turn = 1;
    let gameOver = false;
    const setGameOver = (boolValue) => {
        gameOver = boolValue;
    }
    const setTurn = (number) => {
        turn = number;
    }
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
            overlay.textContent = (overlay.textContent = (nodelist[2].textContent + " horizontal win"));

            return true;
        } else if (nodelist[3].textContent === nodelist[4].textContent &&
            nodelist[4].textContent === nodelist[5].textContent && nodelist[3].textContent !== '') {
            overlay.textContent = (nodelist[4].textContent + " horizontal win");
            return true;
        } else if (nodelist[6].textContent === nodelist[7].textContent &&
            nodelist[7].textContent === nodelist[8].textContent && nodelist[6].textContent !== '') {
            overlay.textContent = (nodelist[6].textContent + " horizontal win");
            return true;
        }
    }
    const isVerticalWin = (nodelist) => {
        if (nodelist[0].textContent === nodelist[3].textContent &&
            nodelist[3].textContent === nodelist[6].textContent && nodelist[0].textContent !== '') {
            overlay.textContent = (nodelist[0].textContent + " vertical win");
            return true;
        } else if (nodelist[1].textContent === nodelist[4].textContent &&
            nodelist[4].textContent === nodelist[7].textContent && nodelist[1].textContent !== '') {
            overlay.textContent = (nodelist[4].textContent + " vertical win");
            return true;
        } else if (nodelist[2].textContent === nodelist[5].textContent &&
            nodelist[5].textContent === nodelist[8].textContent && nodelist[2].textContent !== '') {
            overlay.textContent = (nodelist[2].textContent + " vertical win");
            return true
        }


    }
    const isDiagonalWin = (nodelist) => {
        if (nodelist[0].textContent === nodelist[4].textContent &&
            nodelist[4].textContent === nodelist[8].textContent && nodelist[0].textContent !== '') {
            overlay.textContent = (nodelist[0].textContent + " diagonal win");
            return true;
        } else if (nodelist[6].textContent === nodelist[4].textContent &&
            nodelist[4].textContent === nodelist[2].textContent && nodelist[6].textContent !== '') {
            overlay.textContent = (nodelist[6].textContent + " diagonal win");
            return true
        }


    }
    const isWin = (nodelist) => {
        if (isDiagonalWin(nodelist) === true || isVerticalWin(nodelist) === true || isHorizontalWin(nodelist) === true) {
            gameOver = true
            return true;
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
        isWin, setTurn, setGameOver

    };
})
();

//Module Function
const computerPlayer = (() => {
    let computerSign = "O";

    const getComputerSign = () => computerSign
    const setComputerSign = (sign) => {
        computerSign = sign;
    }
    const computerPlay = (nodelist) => {
        let randNum = Math.floor(Math.random() * nodelist.length);
        setTimeout(() => {
            nodelist[randNum].textContent = "O"

        }, 500);
    }

    return {getComputerSign, setComputerSign, computerPlay,}

})();

//Factory Function
const Player = (name) => {
    let playerSign = "X";
    const getName = () => name;
    const setPlayerSign = (sign) => {
        playerSign = sign

    }
    const getPlayerSign = () => playerSign
    const playerPlay = (cell) => {
        cell.textContent = playerSign;
    }
    return {
        getName, getPlayerSign, setPlayerSign, playerPlay
    }
}

let boot = Player('Boot');
xButton.addEventListener('click', () => boot.setPlayerSign('X'));
oButton.addEventListener('click', () => boot.setPlayerSign('O'));


//game-board event
let cellNodeList = Gameboard.getCellList();
cellNodeList.forEach(cell => cell.addEventListener('click', () => {
    // if (GameLogic.isWin(Gameboard.getCellList()) === true) {
    //     overlay.textContent = "WINNER!"
    // }
    if (GameLogic.isPlayerTurn(boot.getPlayerSign()) && GameLogic.isEmpty(cell) && GameLogic.isGameOver() !== true) {
        boot.playerPlay(cell)
        overlay.classList.add('active');
        GameLogic.incrementTurn()
        GameLogic.isWin(Gameboard.getCellList())


    }
    if (overlay.classList.contains('active') && GameLogic.isGameOver() !== true) {
        computerPlayer.computerPlay(Gameboard.getAvailableCells())

        setTimeout(() => {
            overlay.classList.remove('active')
        }, 1500)
        GameLogic.incrementTurn()
        GameLogic.isWin(Gameboard.getCellList())

    }

}))

overlay.addEventListener('click', () => {
    if (GameLogic.isWin(Gameboard.getCellList())) {


        Gameboard.clearBoard(Gameboard.getCellList())
        overlay.classList.remove('active')


    }
})
//get around computer not getting win b4 click

