import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const Post = props => {
    return (

        // <div className='aos-init aos-animate' data-aos={props.isEven ? "fade-right" : 'fade-left'}>
        <div data-aos='flip-up' data-aos-offset="110">
            <div className='postcard card hoverable'>
                <div className='row card-image left-align'>
                    <div className="col s12">
                        <h1 className='post-title title'><Link className="postTitleLink" to={`/postdetail/${props.postId}`}>{props.title}</Link></h1>
                        <h5 className='body hide-on-small-only marginBottom'>{props.body}</h5>
                        <div className="valign-wrapper">
                            <div className="postImageContainer">
                                <img className="postImage" src={props.userImage} alt="" />
                            </div>
                            <div className="postPersonContainer">
                                <div className="postAuthor">{props.author}</div>
                                <div className="postDate"><Moment calendar>{props.date}</Moment></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Post;