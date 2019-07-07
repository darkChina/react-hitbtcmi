import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import PriceLine from './PriceLine/PriceLine'
import Symbols from './symbols.json'

export default class PriceTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
           symbols: Symbols.map(s => Object.assign({name: s, last: 0, volume: 0}))
        }
        this.ws = new WebSocket('wss://api.hitbtc.com/api/2/ws')
    }

    subscribeTicker(params) {
        let id = 1;
        if (this.ws.readyState === 1) {
            const msg = JSON.stringify({method: 'subscribeTicker', params, id: id++});
            this.ws.send(msg);
        }
      }

    componentDidMount() {
        let index
        const changedSymbols = [...this.state.symbols]

        this.ws.onopen = () => this.state.symbols.forEach(s => this.subscribeTicker({symbol: s.name}))
        this.ws.onmessage = msg => {
          const data = JSON.parse(msg.data)
          if(data.params !== undefined) {
              index = changedSymbols.findIndex(s => s.name === data.params.symbol)
              changedSymbols[index].last = data.params.last
              changedSymbols[index].volume = data.params.volume
              this.setState({symbols: changedSymbols})     
        }
      } 
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>Name</Col>
                    <Col>Price</Col>
                    <Col>Volume</Col>
                </Row>
              {
                  this.state.symbols.map((symbol, i) => <PriceLine key={i} symbol={symbol.name} last={symbol.last} volume={symbol.volume} />)
              }
            </div>
        )
    }
}


 