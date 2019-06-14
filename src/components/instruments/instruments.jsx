import React, { Component } from 'react';
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
import PriceTable from './pricetable'

export default class Instruments extends Component {    
      
    render() {
        const symbolNames = ['BTC', 'ETH', 'USDT', 'DAI', 'TUSD', 'EURS', 'EOS']
        return (
            <div>
                <Navbar>
                    <Navbar.Brand>
                        Instruments
                    </Navbar.Brand>
                </Navbar>

                <Row>
                    {symbolNames.map((name, i) => {
                        return (
                            <Nav.Link key={i}>
                                {name}
                            </Nav.Link>
                        );
                    })}
                </Row>
                
                <Container>
                    <Row>
                        <Col>Name</Col>
                        <Col>Price</Col>
                        <Col>Volume</Col>
                    </Row>

                    <PriceTable />
                </Container>                
            </div>
        );
    }
}
