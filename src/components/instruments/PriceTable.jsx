import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import PriceLine from './PriceLine'
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
                })),
            groupCurrency: ''
        }
        this.markAsFavorite = this.markAsFavorite.bind(this)
        this.renderSwitcher = this.renderSwitcher.bind(this)
        this.showCurrency = this.showCurrency.bind(this)
        this.ws = new WebSocket('wss://api.hitbtc.com/api/2/ws')
        this.ws.onopen = () => this.state.symbols.forEach(s => this.subscribeTicker({symbol: s.id}))
        this.ws.onerror = err => console.log(err)
        this.ws.onmessage = msg => {
            let changedSymbols = [...this.state.symbols]
            let index
            const data = JSON.parse(msg.data)
            if(data.params !== undefined) {
                index = changedSymbols.findIndex(s => s.id === data.params.symbol)
                changedSymbols[index].last = data.params.last
                changedSymbols[index].volume = data.params.volumeQuote
                this.setState({symbols: changedSymbols}) 
            }
        }
    }

    subscribeTicker(params) {
        let id = 1;
        if (this.ws.readyState === 1) {
            const msg = JSON.stringify({method: 'subscribeTicker', params, id: id++});
            this.ws.send(msg);
        }
    }

    renderSwitcher(currency) {
        let sorted
        if(currency === 'Favorites') {
            sorted = this.state.symbols.filter(s => s.isFavorite)
        } else {
            const find = this.state.symbols.filter(s => s.quoteCurrency.indexOf(currency) !== -1)
            sorted = find.sort((a, b) => b.volume - a.volume).slice(0, 10)
        }

        return sorted.map((symbol, i) => 
            <PriceLine 
                key={i} 
                symbol={symbol.id} 
                last={symbol.last} 
                volume={Math.round(symbol.volume * 100) / 100}
                isFavorite={symbol.isFavorite} 
                fav={this.markAsFavorite}/>
            )
        }

    markAsFavorite(symbol) {
        let changedSymbols = [...this.state.symbols]
        const index = changedSymbols.findIndex(s => s.id === symbol)
        const fav = changedSymbols[index].isFavorite
        changedSymbols[index].isFavorite = !fav
    }

    showCurrency(currency) {
        let c
        switch(currency) {
            case '': c = 'USD'
            break
            case 'Favorites' : c = 'Quote'
            break
            default: c = currency
        }
        return c
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>IsFavorite</Col>
                    <Col>Name</Col>
                    <Col>Price</Col>
                    <Col>Volume ({this.showCurrency(this.props.quoteCurrency)})</Col>
                </Row>
                {
                    this.renderSwitcher(this.props.quoteCurrency)
                }
            </div>
        )
    }
}

export default PriceTable