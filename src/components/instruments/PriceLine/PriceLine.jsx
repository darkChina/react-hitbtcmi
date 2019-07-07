import React from 'react'
import { Row, Col } from 'react-bootstrap'

const PriceLine = props => {
          return (
            <Row>
                <Col>{props.symbol}</Col>
                <Col>{props.last}</Col>
                <Col>{props.volume}</Col>
            </Row>
          )     
}

export default PriceLine