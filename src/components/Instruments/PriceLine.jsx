import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Star from '../Star/Star'

const PriceLine = props => {

  const markAsFavorite = symbol => {
    props.fav(symbol)
  }

    return (
      
        <Row>     
            <Col><Star fav={markAsFavorite} symbol={props.symbol} /></Col>       
            <Col>{props.symbol}</Col>
            <Col>{props.last}</Col>
            <Col>{props.volume}</Col>
            <button onClick={() => console.log(props)}>Show props</button>
        </Row>
     
    )   
}

export default PriceLine