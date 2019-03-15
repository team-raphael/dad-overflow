import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';

class ToDo extends React.Component {

    render() {
        return (
            <div className="white-text">
                <Jumbotron
                    mainText="Daddy Doodies"
                    detailText="Your list to become #1 dad!"
                />
                <div className="pageContainer">
                    <div className="container">
                        <h1>This is the to do list Page</h1>
                    </div>
                </div>

                <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
            </div>
        )
    }
}

export default ToDo;