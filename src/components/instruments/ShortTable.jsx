import React, { useState } from 'react'
import PriceLine from './priceline'

const ws = new WebSocket('wss://api.hitbtc.com/api/2/ws')
const symbols = ['BTCUSD', 'ETHUSD']


const subscribeTicker = params => {
    let id = 1;
    if (ws.readyState === 1) {
        const msg = JSON.stringify({method: 'subscribeTicker', params, id: id++});
        ws.send(msg);
    }
  }

ws.onopen = () => symbols.forEach(s => subscribeTicker({symbol: s}))

const ShortTable = props => {
    //const [symbolName, setSymbolName] = useState(props.symbol)
    const [lastPrice, setLastPrice] = useState(0)
    const [lastVolume, setLastVolume] = useState(0)

    const priceLines = symbols.map((symbol, i) => <PriceLine key={i} symbol={symbol} last={lastPrice} volume={lastVolume} /> )


    ws.onmessage = msg => {
        const data = JSON.parse(msg.data)

        if(data.params !== undefined) {
            const index = priceLines.findIndex(e => data.params.symbol === e.props.symbol)
            console.log(index)
            if(priceLines[index].props.symbol === data.params.symbol) {
                setLastPrice = data.params.last
                setLastVolume = data.params.volume
                console.log(priceLines[index])
            }
                   
        }
    }

    return (
        <div>
            {
                priceLines
            }
        </div>
    )
}

export default ShortTable