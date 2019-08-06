import React, { useState } from 'react'
import Symbols from './symbols.json'

const SearchBar = props => {
const [symbolsFound, findSymbols] = useState([])

const changeHandler = event => {
    event.preventDefault()
    const symbolsByCurrency = Symbols.filter(s => s.quoteCurrency === props.currency)
    const find = symbolsByCurrency.filter(s => s.id.indexOf(event.target.value) !== -1)
    findSymbols(event.target.value !== '' ? find : [])  
}

    return (
        <div>
            <input type='text' placeholder='Search...' onChange={changeHandler}/>
            <h3>{symbolsFound.map(s => s.id + ' ')}</h3>
        </div>
    )
}

export default SearchBar