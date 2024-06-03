import { useState } from 'react';
import Header from './Header';

// the button is a jsx element, which is a combination of html and js for a ui component
// {value} in the function parameters indicates the component can be passed a prop called value
// className is the equivalent of class in html, it is a convention for react
// curly braces inside the button component are needed to escape from jsx into js

function Square({ value, onSquareClick }) {
    return <button onClick={onSquareClick} className="square">{value}</button>;
}

export default function Game() {
    const [currentMove, setCurrentMove] = useState(0);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[currentMove];
    
    const xTurn = currentMove % 2 === 0;

    // [...history, nextSquares] creates a new array
    // that contains all the items in history, followed by nextSquares
    // You can read the ...history spread syntax as “enumerate all the items in history”
    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length -1);
    }

    const moves = history.map((squares, move) => {
        let description;
        if(move>0) description = "Go to move # " + move;
        else description = 'Go to game start';
        return (
            <li key={move}>
                <button onClick={()=> setCurrentMove(move)}>{description}</button>
            </li>
        )
    })


    return (
        
        <div className="game">
            <Header></Header>
            <div className="game-board">
                <Board xTurn={xTurn} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );

}

// export so it can be imported in other files
// default to tell the other files, that this is the main function of this file
// the square is a jsx element, which is a combination of html and js for a ui component
// JSX Component Functions are capitalized
// Array(9).fill(null) creates an array with nine elements and sets each of them to null
function Board({ xTurn, squares, onPlay }) {
    // if set is called, state is changed and rerender of component and children will be triggered

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;
        // .slice() creates a cropped copy with params, if params empty, no crop, just copy:
        const nextSquares = squares.slice();
        xTurn ? nextSquares[i] = 'X' : nextSquares[i] = 'O';
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    winner ? status = "Winner: " + winner : status = "Next player is " + (xTurn ? 'X' : 'O');

    return (
        <>
            <div className='status'>{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
}