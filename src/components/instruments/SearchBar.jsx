import React, { Component } from 'react'
import Symbols from './symbols.json'

class SearchBar extends Component {

constructor(props) {
    super(props)
    this.state = {
        value: ''
    }
    this.changeHandler = this.changeHandler.bind(this)
}

changeHandler(event) {
    this.setState({value: event.target.value})
}

compareSymbols() {
    console.log(this.state.value)
}

render() {
    return (
        <div>
            <input type='text' placeholder='Search...' onChange={this.changeHandler}/>
            <h1>{this.state.value || 'default'}</h1>
            <button onClick={this.compareSymbols}>Compare</button>
        </div>
    )
}
    
}

export default SearchBar