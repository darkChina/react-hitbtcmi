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

const PriceTable = props => {
    let symbols
        if(props.quoteCurrency === 'BTC') {
            symbols = [{name: 'BTCUSD', last: 0, volume: 0}]
        }
    symbols = Symbols.map(s => Object.assign({name: s, last: 0, volume: 0}))


        ws.onopen = () => symbols.forEach(s => subscribeTicker({symbol: s.name}))
        let [sym, setSymbols] = useState(symbols)
        let changedSymbols = [...sym]
        let index



        ws.onmessage = msg => {
          const data = JSON.parse(msg.data)
          if(data.params !== undefined) {
              index = changedSymbols.findIndex(s => s.name === data.params.symbol)
              changedSymbols[index].last = data.params.last
              changedSymbols[index].volume = data.params.volume
              setSymbols(changedSymbols)     
        }
      }
        ws.onerror = err => console.log(err)

        return (
            <div>
                <h3>{props.quoteCurrency}</h3>
                <button onClick={() => console.log(symbols)}>Symbols</button>
                <Row>
                    <Col>Name</Col>
                    <Col>Price</Col>
                    <Col>Volume</Col>
                </Row>
              {
                  sym.map((symbol, i) => <PriceLine key={i} symbol={symbol.name} last={symbol.last} volume={symbol.volume} />)
              }

            </div>
        )
    }

export default PriceTable