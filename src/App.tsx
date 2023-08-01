import { useState } from 'react'
import './App.css'

function App() {

  const [coinX, setCoinX] = useState("")
  const [displayCoinX, setDisplayCoinX] = useState("")
  const [coinY, setCoinY] = useState("")
  const [displayCoinY, setDisplayCoinY] = useState("")
  const [coinXPrice, setCoinXPrice] = useState(null)
  const [coinYPrice, setCoinYPrice] = useState(null)
  const [amounts, setAmounts] = useState({x: 1, y: 0})

  const handleChangeX = (event) => {
    setCoinX(event.target.value)
  }

  const handleChangeY = (event) => {
    setCoinY(event.target.value)
  }

  const handleChangeXAmount = (event) => {
    setAmounts({x: event.target.value, y: (event.target.value)*coinXPrice/coinYPrice})
  }

  const handleChangeYAmount = (event) => {
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
          setDisplayCoinX(coinX)
          setDisplayCoinY(coinY)
          setCoinXPrice(response[coinX]["usd"])
          setCoinYPrice(response[coinY]["usd"])
          setAmounts({x: 1, y: response[coinX]["usd"]/response[coinY]["usd"]})
        })
        .catch((err) => console.error(err));
      }
      

  

  

  return (
    <>
      <h1>X Priced in Y</h1>
      <div className="flex py-5 items-center justify-between">
        <p>I want <input type="text" value={coinX} onChange={handleChangeX}/> priced in <input type="text" value={coinY} onChange={handleChangeY}/></p>
        <button onClick={handleClick}>Go!</button>
      </div>
      {coinXPrice && coinYPrice && 
      <h3><input className="text-right h-8" type='text' value={amounts.x} onChange={handleChangeXAmount}/>{` ${displayCoinX} is equal to `}<input className="text-right h-8" type='text' value={amounts.y} onChange={handleChangeYAmount}/>{` ${displayCoinY}`}</h3>
      }
      <footer className="h-8 fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600 text-gray-500">Powered by Coingecko API</footer>
    </>
  )
}

export default App
