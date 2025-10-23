import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from "./components/CoinInfo"
import SideNav from "./components/SideNav"

function App() {
    const API_KEY = import.meta.env.VITE_APP_API_KEY
    const [list, setList] = useState(null)
    const [filteredResults, setFilteredResults] = useState([])
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        const fetchAllCoinData = async () => {
            const response = await fetch("https://min-api.cryptocompare.com/data/top/totaltoptiervol?limit=10&assetClass=ALL&tsym=usd&api_key=" + API_KEY)
            const json = await response.json()
            setList(json)
        }
        fetchAllCoinData().catch(console.error)
    }, [])

    const searchItems = searchValue => {
        setSearchInput(searchValue)
        if (searchValue !== "") {
            const filteredData = list.Data.filter((item) =>
                Object.values(item.CoinInfo)
                    .join("")
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            )
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(list.Data)
        }
    }

    console.log(list)
    return (
        <>
            <div className="whole-page">
                <SideNav />
                <h1>My Crypto List</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => searchItems(e.target.value)}
                />
                <ul>
                    {searchInput.length > 0
                        ? filteredResults
                            .map(coin => {
                                const coinData = coin.CoinInfo
                                if (
                                    coinData.Algorithm !== "N/A" &&
                                    coinData.ProofType !== "N/A"
                                ) {
                                    return (
                                        <CoinInfo
                                            key={coinData.Name}
                                            image={coinData.ImageUrl}
                                            name={coinData.FullName}
                                            symbol={coinData.Name}
                                        />
                                    )
                                }
                                return null
                            })
                        : list?.Data // if no searchInput
                            .map(data => data.CoinInfo)
                            .filter(
                                (coinData) =>
                                    coinData.Algorithm !== "N/A" &&
                                    coinData.ProofType !== "N/A"
                            )
                            .map(coinData => (
                                <CoinInfo
                                    key={coinData.Name}
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
