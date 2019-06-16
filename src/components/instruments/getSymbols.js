const request = require('request');
const symbols = require('./symbols.json');
console.log(symbols.map(symbol => symbol.id))