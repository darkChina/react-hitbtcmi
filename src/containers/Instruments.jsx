import React, { Component } from 'react'
import PriceTable from '../components/Instruments/PriceTable'
import NavigationBar from '../components/Instruments/NavigationBar'
import NavCurrencies from '../components/Instruments/NavCurrencies'
import SearchBar from '../components/Instruments/SearchBar'

class Instruments extends Component{

    constructor(props) {
        super(props)
        this.state = {
            currency: ''
        }
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(currency) {
        this.setState({currency})
        console.log(this.state.currency)
    }

    render() {
        return (
            <div>
                <SearchBar />
                <NavigationBar />
                <NavCurrencies handleClick={this.clickHandler} />
                <PriceTable />
            </div>
        )
    }    
}

export default Instruments