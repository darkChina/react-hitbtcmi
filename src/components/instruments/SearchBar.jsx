import React, { useState } from 'react'
import Symbols from './symbols.json'

const SearchBar = () => {
const [symbolsFound, findSymbols] = useState([])


const changeHandler = event => {
    event.preventDefault()
    const find = Symbols.filter(s => s.indexOf(event.target.value) !== -1)
    findSymbols(event.target.value !== '' ? find : [])   
}

    return (
        <div>
            <input type='text' placeholder='Search...' onChange={changeHandler}/>
            <h3>{symbolsFound.map(s => s + ' ')}</h3>
        </div>
    )
}

export default SearchBar