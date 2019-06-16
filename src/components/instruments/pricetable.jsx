import React, { Component } from 'react';
import PriceLine from './priceline';
import symbols from './symbols.json';


export default class PriceTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            symbols: []
        }
        this.setSymbols = this.setSymbols.bind(this);

    }

    setSymbols() {
        this.setState({symbols: symbols.map(symbol => symbol.id)});
    }

    componentDidMount() {
        this.setSymbols();
        
    }

    render() {
        console.log(this.state.symbols)
        return (
            <div>
                {this.state.symbols.map((symbol, i) => <PriceLine key={i} symbol={symbol}/>)}               
            </div>
        );
    }
}
