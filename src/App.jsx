import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard =[
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

//helper function
function deriveActivePlayer(gameTurns){
    let currentPlayer = 'X'; 
      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
          currentPlayer = 'O';
      }

    return currentPlayer;

}

function App() {
  const [gameTurns, setgameTurns] = useState([]);

  // const [activePlayer, setActivePlayer] = useState("O");

  const activePlayer = deriveActivePlayer(gameTurns);


  let gameBoard = initialGameBoard;

  for(const turn of gameTurns){
      const{square, player} = turn;
      const{row,col} = square;

      gameBoard[row][col] = player; 
    }

    
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];


     if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
    winner = firstSquareSymbol;
  }
  }

 



  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));


    
    setgameTurns(prevTurns => {

      // let currentPlayer = 'X'; 
      // if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
      //     currentPlayer = 'O';
      // }

      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [{square:{ row:rowIndex, col: colIndex}, player:currentPlayer}
                            ,...prevTurns]
    
      
      
     return updatedTurns;

    }); 

    
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="O" isActive={activePlayer === "O"} />
          <Player name="Player 2" symbol="X" isActive={activePlayer === "X"} />
        </ol>
        {/* e ka kriju nje onSelectSquare prop ne komponentin Gameboard edhe e ka pass handleSelectSquare si funsksion */}
        {winner && <p>Player {winner} has won! </p>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
        <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
