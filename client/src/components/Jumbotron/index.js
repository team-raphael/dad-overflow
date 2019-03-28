import React from 'react';
import './style.css';

const Jumbotron = props => {
    return (
        <div className="jumbotron valign-wrapper center">
            <h1 className='animated bounceInDown'>{props.mainText}</h1>
        </div>
    );
}


export default Jumbotron;
