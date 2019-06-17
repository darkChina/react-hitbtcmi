import React, { Component } from 'react';
import PriceLine from './priceline';
import symbols from './symbols.json';


export default class PriceTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            symbols: ['BCNBTC',
            'BTCUSD',
            'DASHBTC',
            'DOGEBTC',
            'DOGEUSD',
            'EMCBTC',
            'ETHBTC',
            'LSKBTC',
            'LTCBTC',
            'LTCUSD',
            'NXTBTC',
            'SBDBTC',
            'SCBTC',
            'STEEMBTC',
            'XDNBTC',
            'XEMBTC']
        }
    }

    // componentDidMount() {
    //     this.setState({symbols: symbols.map(symbol => symbol.id)});       
    // }

    render() {
        return (
            <div>
                {this.state.symbols.map((symbol, i) => <PriceLine key={i} symbol={symbol}/>)}               
            </div>
        );
    }
}
