import React from 'react';
import './style.css';

const Jumbotron = props => {
    return (
        <div className="jumbotron center-align">
            <h1>{props.mainText}</h1>
        </div>
    );
}


export default Jumbotron;
