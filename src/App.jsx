import { useState } from "react";
import { Square } from "./components/Square";

export const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  // Function to calculate the winner based on the current board state.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  // Handles a square click event.
  const handleClick = (index) => {
    if (winner || board[index]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };
  
  // Resets the game to its initial state.
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (isDraw) {
      return 'Draw!';
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-[Inter] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">Tic-Tac-Toe</h1>
        
        <div className="grid grid-cols-3 gap-4">
          {board.map((value, index) => (
            <Square key={index} value={value} onClick={() => handleClick(index)} />
          ))}
        </div>
        
        <div className="mt-8">
          <p className={`text-2xl font-semibold mb-4 ${winner ? (winner === 'X' ? 'text-blue-600' : 'text-red-600') : 'text-gray-700'}`}>
            {getStatus()}
          </p>
          <button
            className="
              px-6 py-3
              bg-blue-600 text-white
              font-bold
              rounded-full
              shadow-lg
              transition-all duration-200
              hover:bg-blue-700 hover:shadow-xl
              focus:outline-none focus:ring-4 focus:ring-blue-500
            "
            onClick={resetGame}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};