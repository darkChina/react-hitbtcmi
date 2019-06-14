import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class PriceLine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symbolName: '',
            lastPrice: 0,
            lastVolume: 0
        }
        this.hitbtcSocket = new WebSocket('wss://api.hitbtc.com/api/2/ws')
        this.subscribeTicker = this.subscribeTicker.bind(this)
      }

      componentDidMount() {
        this.hitbtcSocket.onopen = () => this.subscribeTicker(this.hitbtcSocket, 'subscribeTicker', {symbol: this.props.symbol})
        this.hitbtcSocket.onmessage = msg => {
            const data = JSON.parse(msg.data)
            if(data.params !== undefined) {
                this.setState({
                    symbolName: data.params.symbol,
                    lastPrice: data.params.last, 
                    lastVolume: data.params.volume
                })
             }
        }
    }

    subscribeTicker(hitbtcWs, method, params = {}) {
        if (hitbtcWs.readyState === 1) {
            const msg = JSON.stringify({method, params, id: 123})
            hitbtcWs.send(msg)
        }
      }

      render() {
          return (
            <Row>
                <Col>{this.state.symbolName}</Col>
                <Col>{this.state.lastPrice}</Col>
                <Col>{this.state.lastVolume}</Col>
            </Row>
          )
      }
}