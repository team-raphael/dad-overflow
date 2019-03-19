import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';

class Forum extends React.Component {

    render() {
        return (
            <div className="white-text">
                <Jumbotron
                    mainText="Daddy Issues"
                    detailText="For dads to ask and answer questions"
                />

                <div className="pageContainer">
                    <div className="container">
                        <h1>This is a test</h1>
                    </div>
                </div>

                <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
            </div>
        )
    }
}

export default Forum;