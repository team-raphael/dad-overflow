import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';
import {PostCollection} from '../../components/PostCollection';

class Forum extends React.Component {
    state = {
        posts: [],        
    }

    render() {
        return (
            <div className="white-text">
                <Jumbotron
                    mainText="Daddy Issues"
                />

                <div className="pageContainer">
                    <div className="container">
                        <h3 className='center'>Posts from dads just like you</h3>
                    </div>
                    <PostCollection />
                </div>
                
                <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
            </div>
        )
    }
}

export default Forum;