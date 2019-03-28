import React from 'react';
import './style.css';
import LockScreen from '../../components/LockScreen';
import FirebaseContext from '../../components/Firebase/context';
import { Redirect, Link } from 'react-router-dom';

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
                                <div className="loginPageConatiner marginTopMedium">
                                    <div className="container">
                                        <Link to={"/todo"}><i className="small material-icons marginBottomMedium backArrow">arrow_back</i></Link>
                                        <h6 className="marginBottomMedium marginTopMedium">Sign in with your Email, Google, Facebook, or Twitter account. If you use an email that has not been used to log in to this site before then we will walk you through the process of creating a login.</h6>
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