import React from 'react';
// import styled from 'styled-components';

// const Card = styled.card`
//     // width:150px;
//     height:150px;
//     object-fit: cover;
//     overflow: hidden;
//     border: 2px solid #333;
//     border-radius: 6px;
// `

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