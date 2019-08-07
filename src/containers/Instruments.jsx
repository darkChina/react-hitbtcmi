import React, { Component } from 'react'
import PriceTable from '../components/Instruments/PriceTable'
import NavigationBar from '../components/Instruments/NavigationBar'
import NavCurrencies from '../components/Instruments/NavCurrencies'
import SearchBar from '../components/Instruments/SearchBar'
import './Instruments.css'

class Instruments extends Component{

    constructor(props) {
        super(props)
        this.state = {
            currency: 'USD',
            foundSymbols: []
        }
        this.setCurrency = this.setCurrency.bind(this)
        this.setFoundSymbols = this.setFoundSymbols.bind(this)
    }

    setCurrency(currency) {
        this.setState({currency})
    }

    setFoundSymbols(foundSymbols) {
        this.setState({foundSymbols})
    }

    render() {
        return (
            <div className='Instruments'>
                <SearchBar currency={this.state.currency} findSymbols={this.setFoundSymbols}/>
                <NavigationBar />
                <NavCurrencies handleClick={this.setCurrency} />
                <PriceTable quoteCurrency={this.state.currency} foundSymbols={this.state.foundSymbols}/>
            </div>
        )
    }    
}

export default Instruments