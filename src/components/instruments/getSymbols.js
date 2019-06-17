const WebSocket = require('ws')
const hitbtcSocket = new WebSocket('wss://api.hitbtc.com/api/2/ws')
const symbols = require('./symbols.json');

const arr = symbols.map(symbol => symbol.id)

hitbtcSocket.onopen = () => arr.forEach(s => {
    subscribeTicker(hitbtcSocket, 'subscribeTicker', {symbol: s})
});
hitbtcSocket.onmessage = msg => {
    const data = JSON.parse(msg.data)
    if(data.params !== undefined) {
       console.log(`${data.params.symbol} ${data.params.last} ${data.params.volume}`)       
    }
}

const subscribeTicker = (ws, method, params = {}) => {
    if (ws.readyState === 1) {
        const msg = JSON.stringify({method, params, id: 123})
        ws.send(msg)
    }
}
