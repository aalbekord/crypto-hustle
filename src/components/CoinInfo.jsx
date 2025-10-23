import "./CoinInfo.css"
import { useState, useEffect } from "react"
const CoinInfo = ({ image, name, symbol }) => {
    const API_KEY = import.meta.env.VITE_APP_API_KEY
    const [price, setPrice] = useState(null)

    useEffect(() => {
        const getCoinPrice = async () => {
            const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` + API_KEY)
            const json = await response.json()
            setPrice(json)
        }
        getCoinPrice().catch(console.error)
    }, [symbol]) // This means that now, instead of useEffect() running on every render, it will now run whenever the symbol we pass in changes.

    return (
        <>
            <li className="main-list" key={symbol}>
                <img
                    className="icons"
                    src={`https://www.cryptocompare.com${image}`}
                    alt={`Small icon for ${name} crypto coin`}
                />
                {name}
                {price && price.USD ? ` $${price.USD} USD` : null}
            </li>
        </>
    )
}
export default CoinInfo;