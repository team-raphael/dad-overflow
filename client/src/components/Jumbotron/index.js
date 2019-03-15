import React from 'react';
import './style.css';

const Jumbotron = props => {
    return (
        <div
            className="jumbotron center-align white-text">
            <div>
                <h1>{props.mainText}</h1>
                {props.detailText.trim().length > 0 &&
                    <h3>{props.detailText}</h3>
                }
            </div>
        </div>
    );
}


export default Jumbotron;
