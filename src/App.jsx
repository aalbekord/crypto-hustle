import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from "./components/CoinInfo"

function App() {
    const API_KEY = import.meta.env.VITE_APP_API_KEY
    const [list, setList] = useState(null)

    useEffect(() => {
        const fetchAllCoinData = async () => {
            const response = await fetch("https://min-api.cryptocompare.com/data/top/totaltoptiervol?limit=10&assetClass=ALL&tsym=usd&api_key=" + API_KEY)
            const json = await response.json()
            setList(json)
        }
        fetchAllCoinData().catch(console.error)
    }, [])
    console.log(list)
    return (
        <>
            <div className="whole-page">
                <h1>My Crypto List</h1>
                <ul>
                    {list?.Data
                        .map(data => data.CoinInfo).map(coinData => (
                            <CoinInfo
                                image={coinData.ImageUrl}
                                name={coinData.FullName}
                                symbol={coinData.Name}
                            />

                        ))}
                </ul>
            </div>
        </>
    )
}

export default App
