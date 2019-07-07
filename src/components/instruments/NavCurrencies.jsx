import React from 'react'
import { Nav,  Row } from 'react-bootstrap'


const symbolNames = ['BTC', 'USD', 'ETH', 'TUSD', 'DAI', 'EURS', 'EOS', 'GUSD', 'PAX', 'USDC', 'KRWB', 'EOSDT', 'EOSDT']

const NavCurrencies = () => {
    return (
            <Row>
                {symbolNames.map((name, i) => {
                    return (
                        <Nav.Link key={i}>
                            {name}
                        </Nav.Link>
                    );
                })}
            </Row>
        )
    }  

export default NavCurrencies