import React from 'react';
import styled from 'styled-components';

const Card = styled.card`
    // width:150px;
    height:150px;
    object-fit: cover;
    overflow: hidden;
    border: 2px solid #333;
    border-radius: 6px;
`

const Card = props => {
    return(

        <div>
            <div className='card'>
                <div className='card-image'>
                     <Card onClick={props.handleClick} />
                </div>            
            </div>
        </div>
        
    )
}

export default Card;