import React from 'react'
import PriceTable from '../components/Instruments/PriceTable'
import NavigationBar from '../components/Instruments/NavigationBar'
import NavCurrencies from '../components/Instruments/NavCurrencies'
import SearchBar from '../components/Instruments/SearchBar'

const Instruments = () => {    
    return (
        <div>
            <SearchBar />
            <NavigationBar />
            <NavCurrencies />
            <PriceTable />
        </div>
    );
}

export default Instruments