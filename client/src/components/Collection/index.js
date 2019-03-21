import React from 'react';
import './style.css';


export const Collection = props => {

    return (
        <ul className='collection'>

            <li isComplete={props.isComplete} className="collection-item">{props.body}
                <span className="collection-icons"><i className='far fa-check-circle fa-lg collection-check'></i><i className='far fa-times-circle fa-lg collection-times'></i>
                </span></li>

        </ul>

    )

}