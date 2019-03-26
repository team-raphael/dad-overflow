import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';
import { CollectionWrapper } from '../../components/CollectionWrapper';
import FirebaseContext from "../../components/Firebase/context";
import { Link } from 'react-router-dom';

class ToDo extends React.Component {

    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => {
                    this.firebase = firebase;

                    return (
                        <div className="wrapper white-text">
                            <Jumbotron
                                mainText="Dad Duties"
                                detailText="Getting Ready for Baby!"
                            />
                            {firebase.dbUserInfo &&
                                <div className="pageContainer">
                                    <div className="container">
                                        <p>Your partner may be getting most of the attention right now, but when your new baby arrives,
                                            both of you will have your hands full. Here is an overflow of to-do items to start with, feel free to add more to make sure you're prepared.</p>
                                    </div>
                                    <CollectionWrapper />

                                    <div className='fixed-action-btn'>
                                        <Link id='newPost' to={"/addtodo"} className="btn-floating btn-large waves-effect waves-light btn modal-trigger"><i className="large material-icons">add</i></Link>
                                    </div>
                                </div>
                            }

                            <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
                        </div>
                    );
                }}
            </FirebaseContext.Consumer>
        );
    }

}

export default ToDo;