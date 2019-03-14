import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';

class Forum extends React.Component {

    render() {
        return (
            <div>
                <Jumbotron
                    mainText="Daddy Issues"
                    detailText="Q&amp;A for dads!"
                />

                <div className="container">
                    <h1>This is the Forum Page</h1>
                </div>

                <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
            </div>
        )
    }
}

export default Forum;