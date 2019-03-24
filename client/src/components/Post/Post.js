import React from 'react';
import './style.css';

const Post = props => {
    return(

        <div>
            <div className='card container'>
                <div className='row card-image'>

                        <div className="col l9">
                            <h1 className='title'>{props.title}</h1>
                            <h3 className='body'>{props.body}</h3>
                            <h5 className='author'>{props.author}</h5>
                         </div>
                        {/* <div className="col l3">
                         <img className='hide-on-small' src='./favicon2.png' ></img>
                         </div> */}

                </div>            
            </div>
        </div>
        
    )
}

export default Post;