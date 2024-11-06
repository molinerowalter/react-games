/* eslint-disable react/prop-types */
import { useState, useRef } from 'react'

import './App.css'

const TURNS = {
  x: "X",
  o: "O"
}

const WINNS_SCENARIOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]
  

const Square = ({ children, position, handleSelect, isPlaying = false, turnSquare = false }) => {
  const handleClick = () => {
    handleSelect(position)
  }

  const classes=`${turnSquare && isPlaying ? 'playing' : ''} square`

  return (
    <div onClick={handleClick} className={classes}>
      {children}
    </div>
  )
}

function App() {
  const [ board, updateBoard ] = useState(Array(9).fill(null))
  const [ turn, setTurn ] = useState(TURNS.x)
  const [ winner, setWinner ] = useState(null)

  const emptyBoard = useRef(true)

  function restart() {
    updateBoard(Array(9).fill(null)),
    setTurn(TURNS.x)
    setWinner(null)
    emptyBoard.current = true
  }

  function checkWinner(board){
    return WINNS_SCENARIOS.some(scenario => 
      board[scenario[0]] &&
      board[scenario[0]] === board[scenario[1]] &&
      board[scenario[0]] === board[scenario[2]]
    )

  }

  function handleSelect(position) {
    const newBoard = [...board]
    if (newBoard[position] || winner) return
    
    newBoard[position] = turn
    emptyBoard.current = false
    const isWinnerMove = checkWinner([...newBoard])
    updateBoard([...newBoard])
    if (isWinnerMove) {
      setWinner(turn)
    } 
    else {
      setTurn(turn === TURNS.x ? TURNS.o : TURNS.x)
    }
  }

  return (
    <main>
      <h1>Tic Tac Toe by <span>Walter Molinero</span></h1>
      <section className="board">
          {board.map((item, index) => {
              return (
              <Square handleSelect={handleSelect} position={index} key={index}>
                  {item}
              </Square>
              )
            }
          )}
      </section>
      <button disabled={emptyBoard.current} onClick={restart}>Reset Game</button>
      {
          winner ? (
            <h1>Congratulations {turn}! <span>You are the Winner!</span></h1>
          ) : (
            <div className="turns">
              <Square isPlaying={turn === TURNS.x} turnSquare>
                {TURNS.x}
              </Square>
              <Square isPlaying={turn === TURNS.o} turnSquare>
                {TURNS.o}
              </Square>
            </div>
          )
        }
    </main>
  )
}

export default App
