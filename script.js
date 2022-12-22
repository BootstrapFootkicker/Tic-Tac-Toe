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

    const isXTurn = () => {
        return turn % 2 === 1;
    }
    return {
        getTurn, isXTurn, incrementTurn, isEmpty,

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

    if (GameLogic.isXTurn()&& GameLogic.isEmpty(cell)) {
        cell.textContent = 'X';
        GameLogic.incrementTurn();
    } else if (!GameLogic.isXTurn() && GameLogic.isEmpty(cell)){
        cell.textContent = "O";
        GameLogic.incrementTurn();
    }
    else {
        alert("No Way! Spot Already Taken!")
    }
}))
console.log(cellNodeList);