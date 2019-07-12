import React from 'react'
import { Nav,  Row } from 'react-bootstrap'


const symbolColumns = ['Top 20', 'BTC', 'USD', 'ETH', 'TUSD', 'DAI', 'EURS', 'EOS', 'GUSD', 'PAX', 'USDC', 'KRWB', 'EOSDT', 'Favorites']

const NavCurrencies = props => {

    const clickHandler = currency => {
        props.handleClick(currency)
    }

    return (
        <Row>
            {symbolColumns.map((name, i) => {
                return (
                    <Nav.Link key={i} onClick={() => clickHandler(name)}>
                        {name}
                    </Nav.Link>
                );
            })}
        </Row>
    )
}


export default NavCurrencies