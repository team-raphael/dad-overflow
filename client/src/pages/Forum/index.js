import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';
import { PostCollection } from '../../components/PostCollection';
import { Link } from 'react-router-dom';
import FirebaseContext from "../../components/Firebase/context";

class Forum extends React.Component {
    state = {
        posts: [],
    }
    
    render() {
        return (
            
            <FirebaseContext.Consumer>
                {firebase => {
                    this.firebase = firebase;

                    return (
                        <div className="white-text">
                            <Jumbotron
                                mainText="Dad Overflow"
                            />

                            <div className="pageContainer">
                                <div className="container left-align">
                                    <h3 id='forumTop' className='center'>Posts from dads just like you</h3>
                                </div>
                                <PostCollection />
                            </div>
                            {firebase.firebaseUserInfo &&
                                <div className='fixed-action-btn'>
                                    <Link id='newPost' to={"/addapost"} className="btn-floating btn-large waves-effect waves-light btn modal-trigger"><i className="large material-icons">add</i></Link>
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

export default Forum;