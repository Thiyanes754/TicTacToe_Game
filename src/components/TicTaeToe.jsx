import React, { useState } from "react";
import "./TicTaeToe.css";
import circle_icon from "../assets/circle.png";
import cross_icon from "../assets/cross.png";

const TicTaeToe = () => {
  const [data, setData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(""); // 👈 Winner message

  const handleClick = (index) => {
    if (lock || data[index] !== "") return;

    const newData = [...data];
    newData[index] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    setCount(count + 1);

    checkWinner(newData); // 👈 check winner after update
  };

  const handleReset = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setWinner(""); // 👈 reset winner
  };

  const getImage = (value) => {
    if (value === "x") return <img src={cross_icon} alt="X" />;
    if (value === "o") return <img src={circle_icon} alt="O" />;
    return null;
  };

  const checkWinner = (board) => {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let pattern of wins) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setLock(true);
        setWinner(board[a]); // 'x' or 'o'
        return;
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe <span>Game</span>
      </h1>

      {winner && (
        <div className="winner-inline">
          <span>🎉 Congratulations</span>
          <img
            src={winner === "x" ? cross_icon : circle_icon}
            alt={winner}
            className="winner-icon"
          />
          <span>Wins!</span>
        </div>
      )}

      <div className="board">
        {[...Array(9)].map((_, index) => (
          <div className="boxes" key={index} onClick={() => handleClick(index)}>
            {getImage(data[index])}
          </div>
        ))}
      </div>

      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default TicTaeToe;
