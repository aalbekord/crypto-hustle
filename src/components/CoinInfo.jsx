import "./CoinInfo.css"
import { useState, useEffect } from "react"
const CoinInfo = ({ image, name, symbol }) => {
    const API_KEY = import.meta.env.VITE_APP_API_KEY

    useEffect(() => {
        const getCoinPrice = async () => {
            const response = await fetch(
                `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` +
                API_KEY
            )

            const json = await response.json()
            setPrice(json)
        }
        getCoinPrice().catch(console.error)
        return (
            <div>
                {price ? (
                    // rendering only if API call actually returned us data
                    <div>{price}</div>
                ) : null}
            </div>
        )
    }, [symbol])

    return (
        <>
        </>
    )
}
export default CoinInfo;