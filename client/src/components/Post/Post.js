import React from 'react';
import './style.css';

const Post = props => {
    return(

        <div>
            <div className='card'>
                <div className='card-image'>
                     <h1>{props.title}</h1>
                     <h3>{props.body}</h3>
                     <h5>{props.author}</h5>
                </div>            
            </div>
        </div>
        
    )
}

export default Post;