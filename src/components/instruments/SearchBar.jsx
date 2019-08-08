import React, { useState } from 'react'
import Symbols from './symbols.json'

const SearchBar = props => {
const [symbolsFound, findSymbols] = useState([])

    const changeHandler = event => {

        event.preventDefault()

        const symbolsByCurrency = Symbols.filter(s => s.quoteCurrency === props.currency)

        const find = symbolsByCurrency.filter(s => s.id.indexOf(event.target.value) !== -1)

        findSymbols(event.target.value !== '' ? find : [])

        props.setFoundSymbols(symbolsFound)
    }
    console.log(symbolsFound)
    return (
        <div>
            <input type='text' placeholder='Search...' onChange={changeHandler} list='symbols-datalist'/>
            <datalist id='symbols-datalist'>
            {
                symbolsFound.map((symbol, i) => <option key={i} value={symbol.id}></option>)
            }
            </datalist>
        </div>
    )
}

export default SearchBar