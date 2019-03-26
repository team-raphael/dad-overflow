import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';
import {PostCollection} from '../../components/PostCollection';
import { Link } from 'react-router-dom';

class Forum extends React.Component {
    state = {
        posts: [],        
    }

    render() {
        return (
            <div className="white-text">
                <Jumbotron
                    mainText="Dad Overflow"
                />

                <div className="pageContainer">
                    <div className="container">
                        <h3 className='center'>Posts from dads just like you</h3>
                    </div>
                    <PostCollection />
                </div>
                <div className='fixed-action-btn'>
                <Link id='newPost' to={"/addapost"} className="btn-floating btn-large waves-effect waves-light btn modal-trigger"><i className="large material-icons">add</i></Link>                
                </div>
                <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
            </div>
        )
    }
}

export default Forum;