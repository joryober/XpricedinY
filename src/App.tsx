import { useState } from 'react'
import './App.css'

function App() {

  const [coinX, setCoinX] = useState("")
  const [coinY, setCoinY] = useState("")

  const handleChangeX = (event) => {
    setCoinX(event.target.value)
  }

  const handleChangeY = (event) => {
    setCoinY(event.target.value)
  }

  const handleClick = () => {
    console.log(`${coinX}, ${coinY}`)
  }

  return (
    <>
      <h1>X Priced in Y</h1>
      <p>I want <input type="text" value={coinX} onChange={handleChangeX}/> priced in <input type="text" value={coinY} onChange={handleChangeY}/></p>
      <button onClick={handleClick}>Go!</button>
    </>
  )
}

export default App
