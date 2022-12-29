//module pattern
const Gameboard = (() => {
    let cells = document.querySelectorAll(".cell");

    const getCellList = () => cells;
    return {
        getCellList,

    };
})();

//module pattern
const GameLogic = (() => {
    let turn = 1;

    const getTurn = () => turn;
    const incrementTurn = () => {
        turn += 1;
    }
    const isEmpty = (cell) => {
        return cell.textContent === ''
    }
    const isHorizontalWin = (nodelist) => {
        if (nodelist[0].textContent === nodelist[1].textContent &&
            nodelist[1].textContent === nodelist[2].textContent && nodelist[0].textContent !== '') {
            return true;
        } else if (nodelist[3].textContent === nodelist[4].textContent &&
            nodelist[4].textContent === nodelist[5].textContent && nodelist[3].textContent !== '') {
            return true;
        } else return nodelist[6].textContent === nodelist[7].textContent &&
            nodelist[7].textContent === nodelist[8].textContent && nodelist[6].textContent !== '';
    }

    const isXTurn = () => {
        return turn % 2 === 1;
    }
    return {
        getTurn, isXTurn, incrementTurn, isEmpty, isHorizontalWin

    };
})();

//Factory Function
const Player = (name, playerSign) => {
    const getName = () => name;
    const getPlayerSign = () => playerSign

    return {
        getName, getPlayerSign
    }
}


let cellNodeList = Gameboard.getCellList();
cellNodeList.forEach(cell => cell.addEventListener('click', () => {

    if (GameLogic.isXTurn() && GameLogic.isEmpty(cell)) {
        cell.textContent = 'X';
        GameLogic.incrementTurn();
    } else if (!GameLogic.isXTurn() && GameLogic.isEmpty(cell)) {
        cell.textContent = "O";
        GameLogic.incrementTurn();
    } else {
        alert("No Way! Spot Already Taken!")
    }
    if (GameLogic.isHorizontalWin(Gameboard.getCellList())) {
        console.log(("horizontal win!"))
        alert("horizontal win")
    }
}))
console.log(Gameboard.getCellList());