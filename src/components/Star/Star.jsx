import React from 'react'
import './Star.css'
import goldStar from './gold_star.png'
import blackStar from './black_star.png'


const Star = props => {

    const clickHandler = () => {
        props.fav(props.symbol)
    }
    
    return (
        <div onClick={clickHandler}>
            <img className='star' src={props.isFavorite ? goldStar : blackStar} alt='Star' />
        </div>
    ) 
}

export default Star

