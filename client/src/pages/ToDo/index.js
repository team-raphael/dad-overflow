import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';
import { CollectionWrapper } from '../../components/CollectionWrapper'

class ToDo extends React.Component {

    render() {
        return (
            <div className="wrapper white-text">
                <Jumbotron
                    mainText="Daddy Doodies"
                    detailText="Getting Ready for Baby!"
                />
                <div className="pageContainer">
                    <div className="container">
                        <p>Your partner may be getting most of the attention right now, but when your new baby arrives,
                        both of you will have your hands full. Here is an overflow of to-do items to start with, feel free to add more to make sure you're prepared.</p>
                    </div>
                    <CollectionWrapper />
                </div>

                <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
            </div>
        )
    }
}

export default ToDo;