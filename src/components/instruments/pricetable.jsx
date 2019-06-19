import React, { Component } from 'react';
import PriceLine from './priceline';
import symbols from './symbols.json';


export default class PriceTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderedList: [],
            symbolName: '',
            lastPrice: 0, 
            lastVolume: 0
        }
        this.hitbtcSocket = new WebSocket('wss://api.hitbtc.com/api/2/ws')
        this.subscribeTicker = this.subscribeTicker.bind(this)
    }

    componentDidMount() {
        const symbolsArr = symbols.map(symbol => symbol.id);
        this.hitbtcSocket.onopen = () => symbolsArr.forEach(s => this.subscribeTicker(this.hitbtcSocket, 'subscribeTicker', {symbol: s}))



        this.hitbtcSocket.onmessage = msg => {
            const data = JSON.parse(msg.data)
            if(data.params !== undefined) {
                const renderedList = this.state.renderedList;
                this.setState({
                    symbolName: data.params.symbol,
                    lastPrice: data.params.last, 
                    lastVolume: data.params.volume,
                    renderedList: !renderedList.includes(data.params.symbol) ? renderedList.concat(data.params.symbol) : renderedList
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
                    this.state.renderedList.map(element => <PriceLine symbolName={this.state.symbolName} lastPrice={this.state.lastPrice} lastVolume={this.state.lastVolume} />)
                }
                <p>{this.state.renderedList}</p>
            </div>
        );
    }
}

//{this.state.symbols.map((symbol, i) => <PriceLine key={i} symbol={symbol}/>)}