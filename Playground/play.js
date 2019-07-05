const WebSocket = require('ws')
const testsocket = new WebSocket('wss://api.hitbtc.com/api/2/ws')
const symbols = [
    {name: 'BTCUSD', price: 0},
    {name: 'ETHBTC', price: 0},
    
]

testsocket.onopen = () => symbols.forEach(s => subscribeTicker({symbol: s}))

testsocket.onmessage = msg => {
        const data = JSON.parse(msg.data)
        if(data.params !== undefined) {
            console.log(data.params)
            for(let i = 0; i < symbols.length; i++) {
                if(data.params.symbol === symbols[i]) {
                    symbols[i].price = (data.params.symbol)
                    // setLastPrice(data.params.last)
                    // setLastVolume(data.params.volume)
                    console.log(symbols)

                }
            }
            
        }
    }

    const subscribeTicker = params => {
        let id = 1;
        if (testsocket.readyState === 1) {
            const msg = JSON.stringify({method: 'subscribeTicker', params, id: id++});
            testsocket.send(msg);
        }
      }

