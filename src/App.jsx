import { useState } from 'react'

import Player from './components/Player'
import GameBoard from './components/GameBoard'
function App() {
  // state kryesor eshte te APP sepse eshte prindi edhe mundem me lift vec qeshtu
  // created a useState with the current active player symbol
  const [activePlayer, setActivePlayer] = useState('O');
  // Krijojme nje funksion qe e ben setActivePlayer e ndrron prej x ne o
  function handleSelectSquare(){
    setActivePlayer((currentPlayer)=> currentPlayer === 'X' ? 'O' : 'X' );
  }

  return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player name= "Player 1" symbol="O" isActive={activePlayer === 'O'} />
            <Player name="Player 2" symbol="X" isActive={activePlayer === 'X'} />
          </ol>
          {/* e ka kriju nje onSelectSquare prop ne komponentin Gameboard edhe e ka pass handleSelectSquare si funsksion */}
          <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
        </div>
      </main>
    
  )
}

export default App
