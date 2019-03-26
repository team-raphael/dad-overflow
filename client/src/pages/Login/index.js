import React from 'react';
import './style.css';
import LockScreen from '../../components/LockScreen';
import FirebaseContext from '../../components/Firebase/context';

class Login extends React.Component {

    componentDidMount = () => {
        this.firebase.startAuthUI("#firebaseAuthContainer");
    }

    render() {
        return (
            <FirebaseContext.Consumer>
                {
                    firebase => {
                        this.firebase = firebase;

                        return (
                            <div className="white-text">
                                <div className="container">
                                    <div id="firebaseAuthContainer" className="black-text" />
                                </div>
                                <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
                            </div>
                        )
                    }
                }

            </FirebaseContext.Consumer>
        )
    }
}

export default Login;