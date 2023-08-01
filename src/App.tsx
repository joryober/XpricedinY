import { useState } from 'react'
import './App.css'

function App() {

  const [coinX, setCoinX] = useState("")
  const [coinY, setCoinY] = useState("")
  const [coinXPrice, setCoinXPrice] = useState(null)
  const [coinYPrice, setCoinYPrice] = useState(null)
  // const [coinXAmount, setCoinXAmount] = useState(1)
  // const [coinYAmount, setCoinYAmount] = useState(0)
  const [amounts, setAmounts] = useState({x: 1, y: 0})

  const handleChangeX = (event) => {
    setCoinX(event.target.value)
  }

  const handleChangeY = (event) => {
    setCoinY(event.target.value)
  }

  const handleChangeXAmount = (event) => {
    // setCoinXAmount(event.target.value)
    // setCoinYAmount(prev => (event.target.value)*coinXAmount/coinYPrice)
    setAmounts({x: event.target.value, y: (event.target.value)*coinXPrice/coinYPrice})
  }

  const handleChangeYAmount = (event) => {
    // setCoinYAmount(event.target.value)
    // setCoinXAmount((event.target.value)*coinYAmount/coinXPrice)
    setAmounts({x: (event.target.value)*coinYPrice/coinXPrice, y: event.target.value})
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const handleClick = () => {
        fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinX}%2C${coinY}&vs_currencies=usd`,
          options
        )
        .then((response) => response.json())
        .then((response) => {
          setCoinXPrice(response[coinX]["usd"])
          setCoinYPrice(response[coinY]["usd"])
          setAmounts({x: 1, y: response[coinX]["usd"]/response[coinY]["usd"]})
        })
        .catch((err) => console.error(err));
      }
      

  

  

  return (
    <>
      <h1>X Priced in Y</h1>
      <p>I want <input type="text" value={coinX} onChange={handleChangeX}/> priced in <input type="text" value={coinY} onChange={handleChangeY}/></p>
      <button onClick={handleClick}>Go!</button>
      {coinXPrice && coinYPrice && 
      <h3><input type='text' value={amounts.x} onChange={handleChangeXAmount}/>{`${coinX} is equal to `}<input type='text' value={amounts.y} onChange={handleChangeYAmount}/>{` ${coinY}`}</h3>
      }
    </>
  )
}

export default App
