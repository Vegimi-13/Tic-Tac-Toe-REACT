import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  Y: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//helper function
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  console.log(gameBoard);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    // console.log("Square", square);
    // console.log("turn", turn);
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [playerName, setplayerName] = useState(PLAYERS);
  const [gameTurns, setgameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerName);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));

    setgameTurns((prevTurns) => {
      // let currentPlayer = 'X';
      // if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
      //     currentPlayer = 'O';
      // }

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setgameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setplayerName((prevName) => {
      return {
        ...prevName,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            onChangeName={handlePlayerName}
            isActive={activePlayer === "X"}
          />
          <Player
            name={PLAYERS.Y}
            symbol="O"
            onChangeName={handlePlayerName}
            isActive={activePlayer === "O"}
          />
        </ol>
        {/* e ka kriju nje onSelectSquare prop ne komponentin Gameboard edhe e ka pass handleSelectSquare si funsksion */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
