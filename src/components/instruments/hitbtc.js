import React from 'react'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      connected: false,
      currentBids: [],
      currentAsks: []
    }
    this.hitbtcSocket = new WebSocket('wss://api.hitbtc.com/api/2/ws')
    this.subscribeOrderbook = this.subscribeOrderbook.bind(this)
  }

  componentDidMount() {
    this.hitbtcSocket.onopen = () => this.subscribeOrderbook(this.hitbtcSocket, 'subscribeOrderbook', {symbol: 'BTCUSD'})
    this.hitbtcSocket.onmessage = msg => {
      const data = JSON.parse(msg.data)
      if(data.params !== undefined) {
        const bids = data.params.bid.map(bid => bid.price)
        const asks = data.params.ask.map(ask => ask.price)

        this.setState({currentBids: bids, currentAsks: asks})
      }
    }
  }
  
  render() {
    const bids = this.state.currentBids.map(bid => <li>{`BID: ${bid}`}</li>)
    const asks = this.state.currentAsks.map(ask => <li>{`ASK: ${ask}`}</li>)

    return (
      <div className="App">
        <h1>{
          this.state.currentBids[0] !== undefined && this.state.currentAsks[0] !== undefined ?
          `Current price: ${this.state.currentBids[0]} / ${this.state.currentAsks[0]}`
          : ``
        }</h1>
        <ul>{bids}</ul>
        <ul>{asks}</ul>
      </div>
    )
  }

  subscribeOrderbook(hitbtcWs, method, params = {}) {
    if (hitbtcWs.readyState === 1) {
        const msg = JSON.stringify({method, params, id: 123})
        hitbtcWs.send(msg)
    }
  }
}

export default App