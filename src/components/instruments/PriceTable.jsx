import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import PriceLine from './PriceLine/PriceLine'

import Symbols from './symbols.json'


const ws = new WebSocket('wss://api.hitbtc.com/api/2/ws')


const subscribeTicker = params => {
    let id = 1;
    if (ws.readyState === 1) {
        const msg = JSON.stringify({method: 'subscribeTicker', params, id: id++});
        ws.send(msg);
    }
}

const PriceTable = ({ quoteCurrency }) => {
    
const symbols = Symbols.map(s => Object.assign({id: s.id, quoteCurrency: s.quoteCurrency, last: 0, volume: 0}))

    ws.onopen = () => symbols.forEach(s => subscribeTicker({symbol: s.id}))
        
    const [sym, setSymbols] = useState(symbols)
    const [favorites, setFavorites] = useState([])
    let changedSymbols = [...sym]
    let index

    ws.onmessage = msg => {
        const data = JSON.parse(msg.data)
        if(data.params !== undefined) {
            index = changedSymbols.findIndex(s => s.id === data.params.symbol)
            changedSymbols[index].last = data.params.last
            changedSymbols[index].volume = data.params.volumeQuote
            setSymbols(changedSymbols)     
        }
    }
    ws.onerror = err => console.log(err)



    const renderSwitcher = currency => {
        if(currency === 'Top 20') {
            console.log(currency)
        }

        if(currency === 'Favorites') {
            console.log(currency)
        }
        const find = sym.filter(s => s.quoteCurrency.indexOf(currency) !== -1)
        const sorted = find.sort((a, b) => b.volume - a.volume).slice(0, 20)
        return sorted.map((symbol, i) => <PriceLine key={i} symbol={symbol.id} last={symbol.last} volume={symbol.volume} />)
    }

    return (
        <div>
            <Row>
                <Col>Name</Col>
                <Col>Price</Col>
                <Col>Volume (Quote)</Col>
            </Row>
            {
                renderSwitcher(quoteCurrency)
            }
        </div>
        )
    }

export default PriceTable