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
                availableCells.push(cells[cell]);
            }
        }
        return availableCells;
    }

    return {
        getCellList, getAvailableCells,

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
        isWin

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
            //nodelist[randNum].click()
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
    if (GameLogic.isPlayerTurn(boot.getPlayerSign()) && GameLogic.isEmpty(cell)) {

        boot.playerPlay(cell)
        overlay.classList.add('active');
        GameLogic.incrementTurn()

    }
    if (overlay.classList.contains('active')) {
        computerPlayer.computerPlay(Gameboard.getAvailableCells())

        GameLogic.incrementTurn()
        setTimeout(()=> {overlay.classList.remove('active')},1500)

    }

    // if (GameLogic.isWin(Gameboard.getCellList())) {
    //     alert(" game done!")
    //
    //     this.disabled();
    //
    // } else if (GameLogic.isPlayerTurn(boot.getPlayerSign()) && GameLogic.isEmpty(cell)) {
    //     boot.playerPlay(cell);
    //     GameLogic.incrementTurn();
    //
    //     computerPlayer.computerPlay(Gameboard.getAvailableCells());
    //     GameLogic.incrementTurn();
    //
    //
    // }


}))


//get around computer not getting win b4 click

