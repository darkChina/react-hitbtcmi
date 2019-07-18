import React from 'react'
import { Nav,  Row } from 'react-bootstrap'


const symbolColumns = ['USD', 'BTC', 'ETH', 'TUSD', 'DAI', 'EURS', 'EOS', 'GUSD', 'PAX', 'USDC', 'KRWB', 'EOSDT', 'Favorites']

const NavCurrencies = props => {

    const clickHandler = currency => {
        props.handleClick(currency)
    }

    return (
        <Row className='navCurrencies'>
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