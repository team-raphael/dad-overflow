import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Post = props => {
    return(

        // <div className='aos-init aos-animate' data-aos={props.isEven ? "fade-right" : 'fade-left'}>
        <div className='aos-init aos-animate' data-aos='flip-up' data-aos-offset="130">
            <div className='postcard card container' >
                <div className='row card-image left-align'>
                        <div className="col s12">
                            <h1 className='post-title title'><Link className="postTitleLink" to={`/postdetail/${props.postId}`}>{props.title}</Link></h1>
                            <h5 className='body hide-on-small-only'>{props.body}</h5>
                            <h6 className='author'>{props.author}</h6>
                         </div>
                </div>            
            </div>
        </div>
        
    )
}

export default Post;