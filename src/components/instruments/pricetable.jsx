import React, { Component } from 'react';
import PriceLine from './priceline';
import symbols from './symbols.json';

export default class PriceTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            symbols: ['BTCUSD', 'DASHBTC', 'ETHBTC', 'EMCBTC', 'XEMBTC'],
            symbolName: '',
            lastPrice: 0, 
            lastVolume: 0
        }
        this.hitbtcSocket = new WebSocket('wss://api.hitbtc.com/api/2/ws')
        this.subscribeTicker = this.subscribeTicker.bind(this)
    }

    componentDidMount() {
        this.hitbtcSocket.onopen = () => this.state.symbols.forEach(s => this.subscribeTicker(this.hitbtcSocket, 'subscribeTicker', {symbol: s}))

        this.hitbtcSocket.onmessage = msg => {
            const data = JSON.parse(msg.data)
            if(data.params !== undefined) {
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
                    this.state.symbols.map((symbol, i) => symbol === this.state.symbolName ? 
                        <PriceLine key={i} symbol={symbol} last={this.state.lastPrice} volume={this.state.lastVolume} /> : 
                        <PriceLine key={i} symbol={symbol} last={0} volume={0} />)
                }
            </div>
        );
    }
}

