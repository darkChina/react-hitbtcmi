import React, { Component } from 'react';
import PriceLine from './priceline'

export default class PriceTable extends Component {

    render() {
        return (
            <div>               
                <PriceLine symbol='BTCUSD'/>
                <PriceLine symbol='XRPBTC'/>
                <PriceLine symbol='ETHUSD'/>
            </div>
        );
    }
}
