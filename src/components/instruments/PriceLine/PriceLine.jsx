import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Star from '../../Star/Star'

const PriceLine = props => {
          return (
            <Row>     
                <Col><Star selected={false} /></Col>       
                <Col>{props.symbol}</Col>
                <Col>{props.last}</Col>
                <Col>{props.volume}</Col>
            </Row>
          )     
}

export default PriceLine