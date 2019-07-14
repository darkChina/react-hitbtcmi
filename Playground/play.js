const WebSocket = require('ws')

const symbols = ['BTCUSD', 'LTCBTC', 'ETHBTC']


const socket = new WebSocket('wss://api.hitbtc.com/api/2/ws')


const subscribeTicker = params => {
    let id = 1;
    if (socket.readyState === 1) {
        const msg = JSON.stringify({method: 'subscribeTicker', params, id: id++});
        socket.send(msg);
    }
}

class Quote {
    constructor() {
        this.name = '',
        this.last = 0,
        this.volume = 0
    }


    setQuote(quote) {
        this.name = quote.symbol,
        this.last = quote.last,
        this.volume = quote.volume
    }
}


    socket.onopen = () => symbols.forEach(s => subscribeTicker({symbol: s}))

    socket.onmessage = msg => {
          const data = JSON.parse(msg.data)
          const q = new Quote()

          if(data.params !== undefined) {

            q.setQuote(data.params)
            return q


            }
      }


    socket.onerror = err => console.log(err)
    console.log(q)


