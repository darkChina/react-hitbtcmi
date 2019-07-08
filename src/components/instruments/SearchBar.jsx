import React, { Component } from 'react'
import Symbols from './symbols.json'

class SearchBar extends Component {

constructor(props) {
    super(props)
    this.state = {
        symbolsFound: []
    }
    this.changeHandler = this.changeHandler.bind(this)
}

changeHandler(event) {
    event.preventDefault()
    const find = Symbols.filter(s => s.indexOf(event.target.value) !== -1)
    this.setState({symbolsFound: event.target.value !== '' ? find : []})   
}

render() {
    return (
        <div>
            <input type='text' placeholder='Search...' onChange={this.changeHandler}/>
            <h3>{this.state.symbolsFound.map(s => s + ' ')}</h3>
        </div>
    )
}
    
}

export default SearchBar