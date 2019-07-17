import React, { Component } from 'react'
import './Star.css'
import goldStar from './gold_star.png'
import blackStar from './black_star.png'


class Star extends Component {
   constructor(props) {
       super(props)
       this.state = {
           selected: false
       }
       this.clickHandler = this.clickHandler.bind(this)
   }
   

   clickHandler() {
        const select = this.state.selected
        this.setState({selected: !select})
    }

    render() {
        return <div onClick={this.clickHandler}>
            <img className='star' src={this.state.selected ? goldStar : blackStar} alt='Star' />
        </div>
    }
    
}

export default Star

