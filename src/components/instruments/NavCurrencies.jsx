import React, { Component } from 'react'
import { Nav,  Row } from 'react-bootstrap'


const symbolColumns = ['BTC', 'USD', 'ETH', 'TUSD', 'DAI', 'EURS', 'EOS', 'GUSD', 'PAX', 'USDC', 'KRWB', 'EOSDT', 'EOSDT', 'Favorites']

class NavCurrencies extends Component {

    clickHandler(currency) {
        this.props.handleClick(currency)
    }

    render() {
        return (
            <Row>
                {symbolColumns.map((name, i) => {
                    return (
                        <Nav.Link key={i} onClick={() => this.clickHandler(name)}>
                            {name}
                        </Nav.Link>
                    );
                })}
            </Row>
        )
    }
}  

export default NavCurrencies