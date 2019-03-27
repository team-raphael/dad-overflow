import React from 'react';
import './style.css';
import LockScreen from '../../components/LockScreen';
import FirebaseContext from '../../components/Firebase/context';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {

    state = {
        goBack: false
    }

    componentDidMount = () => {
        this.firebase.startAuthUI("#firebaseAuthContainer", this.redirectOnSuccessfulLogin);
    }

    redirectOnSuccessfulLogin = () => {
        this.setState({
            goBack: true
        });
    }

    render() {
        return (
            <FirebaseContext.Consumer>
                {
                    firebase => {
                        this.firebase = firebase;

                        if (this.state.goBack) {
                            return <Redirect to="/" push={true} />
                        } else {
                            return (
                                <div className="white-text">
                                    <div className="container">
                                        <div id="firebaseAuthContainer" className="black-text" />
                                    </div>
                                    <LockScreen id="loginPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
                                </div>
                            )
                        }
                    }
                }

            </FirebaseContext.Consumer>
        )
    }
}

export default Login;