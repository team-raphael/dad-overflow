import React from 'react';
import './style.css';

const Post = props => {
    return(

        <div>
            <div className='card container'>
                <div className='row card-image'>
                        <div className="col s12">
                            <h1 className='title'>{props.title}</h1>
                            <h5 className='body hide-on-small-only'>{props.body}</h5>
                            <h6 className='author'>{props.author}</h6>
                         </div>
                </div>            
            </div>
        </div>
        
    )
}

export default Post;