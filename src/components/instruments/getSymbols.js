const WebSocket = require('ws');
const hitbtcSocket = new WebSocket('wss://api.hitbtc.com/api/2/ws');
const symbols = require('./symbols.json');
//const writeStream = require('fs').createWriteStream('./quotes/quotes.json');

const arr = symbols.map(symbol => symbol.id);


hitbtcSocket.onopen = () => arr.forEach(s => {
    subscribeTicker('subscribeTicker', {symbol: s});
});

let quoteArr = ['current name'];
hitbtcSocket.onmessage = msg => {
    const data = JSON.parse(msg.data);
    if(data.params !== undefined) {
        //writeStream.write(JSON.stringify(data.params));
        
        let quote = {
            last: data.params.last,
            volume: data.params.volume,
            timestamp: data.params.timestamp,
            symbol: data.params.symbol
        };

        // quoteArr.forEach(e => e.symbol)


        //каждый раз, когда приходи сообщение с котировкой, проверять, отрендерили ли уже и 
        //рендерить как новый только если компонент с таким ид (именем символа) ещё не был отрисован
        //если уже был, то искать среди тех, что уже были отрисованы и менять значения last и volume
        if(!quoteArr.includes(data.params.symbol)) {
            quoteArr.push(data.params.symbol);
        } else {
            quoteArr[0] === data.params.symbol;
        }

        console.log(quoteArr);
        console.log(quoteArr.length);
        if(quoteArr.length == 10) {
            hitbtcSocket.close();
            console.log(quoteArr);

        }
    }
}

const subscribeTicker = (method, params = {}) => {
    let id = 1;
    if (hitbtcSocket.readyState === 1) {
        const msg = JSON.stringify({method, params, id: id++});
        hitbtcSocket.send(msg);
    }
}
