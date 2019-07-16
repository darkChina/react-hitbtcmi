import React from 'react'
import './Star.css'
import goldStar from './gold_star.png'
import blackStar from './black_star.png'


const Star = () => {
    let selected = false

    const select = () => {
        console.log(selected)
    }
    return <div onClick={select}>
                <img className='goldStar' src={selected ? goldStar : blackStar} alt='Star' />
            </div>
}

export default Star