import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class PriceLine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symbolName: this.props.symbolName,
            lastPrice: this.props.symbolPrice,
            lastVolume: this.props.symbolVolume
        }
      }

    //   componentDidMount() {
    //     this.hitbtcSocket.onopen = () => this.subscribeTicker(this.hitbtcSocket, 'subscribeTicker', {symbol: this.props.symbol})
    //     this.hitbtcSocket.onmessage = msg => {
    //         const data = JSON.parse(msg.data)
    //         if(data.params !== undefined) {
    //             this.setState({
    //                 symbolName: data.params.symbol,
    //                 lastPrice: data.params.last, 
    //                 lastVolume: data.params.volume
    //             })
    //          }
    //     }
    // }

    // subscribeTicker(ws, method, params = {}) {
    //     let id = 1;
    //     if (ws.readyState === 1) {
    //         const msg = JSON.stringify({method, params, id: id++});
    //         ws.send(msg);
    //     }
    //   }

      render() {
          return (
            <Row>
                <Col>{this.props.symbolName}</Col>
                <Col>{this.props.lastPrice}</Col>
                <Col>{this.props.lastVolume}</Col>
            </Row>
          )
      }
}