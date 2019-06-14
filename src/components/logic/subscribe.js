const WebSocket = require('ws');

const hitbtcSocket = new WebSocket('wss://api.hitbtc.com/api/2/ws')

hitbtcSocket.onopen = () => subscribeOrderbook(hitbtcSocket, 'subscribeOrderbook', {symbol: 'BTCUSD'});



hitbtcSocket.onmessage = msg => {
    const data = JSON.parse(msg.data);
    if(data.params !== undefined) {
      const bids = data.params.bid.map(bid => bid.price);
      const asks = data.params.ask.map(ask => ask.price);
      console.log(`${bids[0]} and ${asks[0]}`)

      return `${bids[0]} and ${asks[0]}`;
    }
  }

  const subscribeOrderbook = (hitbtcWs, method, params = {}) => {
    if (hitbtcWs.readyState === 1) {
        const msg = JSON.stringify({method, params, id: 123});
        hitbtcWs.send(msg);
    }
  }
