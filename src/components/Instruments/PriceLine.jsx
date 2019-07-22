import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import Star from '../Star/Star'

class PriceLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFavorite: false
    }
    this.markAsFavorite = this.markAsFavorite.bind(this)
  }

  markAsFavorite() {
      const fav = this.state.isFavorite
      this.setState({isFavorite: !fav})
  }

  showSymbol(symbol) {
    this.props.show(symbol)
  }

  render() {
    return (
      <div onClick={() => this.showSymbol(this.props.symbol)}>
        <Row>     
            <Col><Star /></Col>       
            <Col>{this.props.symbol}</Col>
            <Col>{this.props.last}</Col>
            <Col>{this.props.volume}</Col>
        </Row>
      </div>
      
    )     
  }   
}

export default PriceLine