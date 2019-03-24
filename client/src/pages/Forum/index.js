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
            <div className="show-on-small show-on-medium-and-up white-text">
                <Jumbotron
                    mainText="Daddy Issues"
                />

                <div className="pageContainer">
                    <div className="container">
                        <h3>Posts from dads just like you</h3>
                    </div>
                    <PostCollection />
                </div>
                
                <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
            </div>
        )
    }
}

export default Forum;