import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import PriceLine from '../src/components/Instruments/PriceLine'
import Symbols from './symbols.json'

class PriceTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symbols: Symbols.map(s => 
                Object.assign({
                    id: s.id, 
                    quoteCurrency: s.quoteCurrency, 
                    last: 0, 
                    volume: 0, 
                    isFavorite: false
                }))
        }
        this.renderSwitcher = this.renderSwitcher.bind(this)
        this.ws = new WebSocket('wss://api.hitbtc.com/api/2/ws')
        this.ws.onopen = () => this.state.symbols.forEach(s => this.subscribeTicker({symbol: s.id}))
        this.ws.onerror = err => console.log(err)
        this.ws.onmessage = msg => {
            let changedSymbols = [...sym]
            let index
            const data = JSON.parse(msg.data)
            if(data.params !== undefined) {
                index = changedSymbols.findIndex(s => s.id === data.params.symbol)
                changedSymbols[index].last = data.params.last
                changedSymbols[index].volume = data.params.volumeQuote
                setSymbols(changedSymbols) 
            }
        }
    }

    subscribeTicker(params) {
        let id = 1;
        if (ws.readyState === 1) {
            const msg = JSON.stringify({method: 'subscribeTicker', params, id: id++});
            ws.send(msg);
        }
    }

    renderSwitcher(currency) {
        const find = sym.filter(s => s.quoteCurrency.indexOf(currency) !== -1)
        let sorted
        if(currency === 'Favorites') {
            sorted = find.filter(s => s.isFavorite === true)
        } else {
            sorted = find.sort((a, b) => b.volume - a.volume).slice(0, 10)
        }
        return sorted.map((symbol, i) => <PriceLine key={i} symbol={symbol.id} last={symbol.last} volume={symbol.volume}/>)
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>IsFavorite</Col>
                    <Col>Name</Col>
                    <Col>Price</Col>
                    <Col>Volume ({this.props.quoteCurrency || 'USD'})</Col>
                </Row>
                {
                    this.renderSwitcher(this.props.quoteCurrency)
                }
            </div>
        )
    }
}

export default PriceTable