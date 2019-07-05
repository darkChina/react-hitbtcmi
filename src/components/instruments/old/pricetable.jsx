import React, { Component } from 'react';
import PriceLine from './priceline';
import Prices from '../priceTable';
import symbols from '../symbols.json';

export default class PriceTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            symbols: [
                { name: 'BTCUSD', lastPrice: 0, lastVolume: 0 },
                { name: 'DASHBTC', lastPrice: 0, lastVolume: 0 },
                { name: 'ETHBTC', lastPrice: 0, lastVolume: 0 },
                { name: 'EMCBTC', lastPrice: 0, lastVolume: 0 },
                { name: 'XEMBTC', lastPrice: 0, lastVolume: 0 }
            ],
            symbolName: '',
            lastPrice: 0, 
            lastVolume: 0
        }
        this.hitbtcSocket = new WebSocket('wss://api.hitbtc.com/api/2/ws')
        this.subscribeTicker = this.subscribeTicker.bind(this)
    }

    componentDidMount() {
        this.hitbtcSocket.onopen = () => this.state.symbols.forEach(s => this.subscribeTicker(this.hitbtcSocket, 'subscribeTicker', {symbol: s.name}))

        this.hitbtcSocket.onmessage = msg => {
            const data = JSON.parse(msg.data)
            if(data.params !== undefined) {
                const index = this.state.symbols.findIndex(s => s.name === data.params.symbol)
                if(data.params.symbol === this.state.symbols[index].name) {
                    console.log(index)

                }
                this.setState({
                    symbolName: data.params.symbol,
                    lastPrice: data.params.last, 
                    lastVolume: data.params.volume,
                })
            }
        } 
    }


    subscribeTicker(ws, method, params = {}) {
        let id = 1;
        if (ws.readyState === 1) {
            const msg = JSON.stringify({method, params, id: id++});
            ws.send(msg);
        }
      }

    render() {
        return (
            <div> 
                {
                    this.state.symbols.map((symbol, i) => <PriceLine key={i} symbol={symbol.name} last={this.state.lastPrice} volume={this.state.lastVolume} /> )
                }
            </div>
        );
    }
}

