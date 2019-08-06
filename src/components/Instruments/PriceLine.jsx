import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Star from '../Star/Star'

const PriceLine = props => {

  const markAsFavorite = symbol => {
    props.fav(symbol)
  }

    return (
      
        <Row>     
            <Col><Star fav={markAsFavorite} symbol={props.symbol} isFavorite={props.isFavorite}/></Col>       
            <Col>{props.symbol}</Col>
            <Col>{props.last}</Col>
            <Col>{props.volume}</Col>
        </Row>
     
    )   
}

export default PriceLine