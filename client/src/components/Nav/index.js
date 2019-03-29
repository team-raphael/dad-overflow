import React from 'react';
import { Link, Redirect } from "react-router-dom";
import './style.css';
import * as FirebaseApp from 'firebase/app';
import FirebaseContext from '../Firebase/context';

class Nav extends React.Component {

    state = {
        goHome: false
    }

    sideNavInstance = null;

    componentDidUpdate = () => {
        //Initialize profile drop down
        var elems = document.querySelectorAll('.dropdown-trigger');
        window.M.Dropdown.init(elems, { coverTrigger: false, constrainWidth: false });
    }

    componentDidMount = () => {
        //Initialize the nav bar
        const sideNavElement = document.querySelector('.sidenav');
        this.sideNavInstance = window.M.Sidenav.init(sideNavElement);
    };

    //Method that closes the side nav
    closeSideNav = () => {
        this.sideNavInstance.close();
    };

    //On click handler for the sign out button
    signOutOnClick = () => {
        FirebaseApp.auth().signOut();
        this.closeSideNav();
        if (window.location.pathname !== "/") {
            this.setState({ goHome: true });
        }
    };

    scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    render() {

        return (
            <FirebaseContext.Consumer>
                {
                    firebase => {


                        return (
                            <div className="reactNav">
                                <div className="navbar-fixed">
                                    <nav id="navbar-nav" className="blue-grey darken-3">
                                        <div className="container nav-wrapper">
                                            <Link to={"/"} className="brand-logo" onClick={this.scrollToTop}><i className="logo"></i><span> Dad Overflow</span></Link>
                                            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                                            <ul className="right hide-on-med-and-down">
                                                <li className={window.location.pathname.toLowerCase() === "/" ? "active" : ""}>
                                                    <Link to={"/"}>Forum</Link>
                                                </li>
                                                {firebase.firebaseUserInfo &&
                                                    <li className={window.location.pathname.toLowerCase() === "/todo" ? "active" : ""}>
                                                        <Link to={"/todo"}>To Do</Link>
                                                    </li>
                                                }
                                                {!firebase.firebaseUserInfo &&
                                                    <li className={`loginLink ${window.location.pathname.toLowerCase() === "/login" ? "active" : ""}`}>
                                                        <Link id='loginButton' className="waves-effect waves-light btn" to={"/login"}>Login/Signup</Link>
                                                    </li>
                                                }
                                                {firebase.firebaseUserInfo &&
                                                    <li>
                                                        <img className="dropdown-trigger profileImage" data-target='profileDropdown' src={(firebase.dbUserInfo && firebase.dbUserInfo.image) ? firebase.dbUserInfo.image : "https://via.placeholder.com/225"} alt="profile"></img>

                                                        <ul id='profileDropdown' className='blue-grey darken-1 dropdown-content'>
                                                            <li>
                                                                <Link className="profileLink" to={"/profile"}>Profile</Link>
                                                            </li>
                                                            <li className="divider" tabIndex="-1"></li>
                                                            <li className="noHighlight buttonListItem">
                                                                <button onClick={this.signOutOnClick} className="signOffButton waves-effect waves-light btn">Sign Off</button>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </nav>

                                </div>

                                <ul className="sidenav blue-grey darken-3 white-text" id="mobile-demo">
                                    <li>
                                        <div className="user-view">
                                            <div className="background blue-grey lighten-1" />
                                            <div><img className="circle white" data-target='profileDropdown' src={(firebase.dbUserInfo && firebase.dbUserInfo.image) ? firebase.dbUserInfo.image : "https://via.placeholder.com/225"} alt="profile" /></div>
                                            <div><span className="white-text name">{(firebase.firebaseUserInfo && firebase.firebaseUserInfo.displayName) ? firebase.firebaseUserInfo.displayName : ""}</span></div>
                                            <div><span className="white-text email">{(firebase.firebaseUserInfo && firebase.firebaseUserInfo.email) ? firebase.firebaseUserInfo.email : ""}</span></div>
                                        </div>
                                    </li>

                                    <li className={window.location.pathname.toLowerCase() === "/" ? "active" : ""}>
                                        <Link to={"/"} onClick={this.closeSideNav}>Forum</Link>
                                    </li>
                                    {firebase.firebaseUserInfo &&
                                        <li className={window.location.pathname.toLowerCase() === "/todo" ? "active" : ""}>
                                            <Link to={"/todo"} onClick={this.closeSideNav}>To Do</Link>
                                        </li>
                                    }
                                    {!firebase.firebaseUserInfo &&
                                        <li className={window.location.pathname.toLowerCase() === "/login" ? "active" : ""}>
                                            <Link id='loginButtonMobile' className="waves-effect waves-light btn" to={"/login"} onClick={this.closeSideNav}>Login/Signup</Link>
                                        </li>
                                    }
                                    {firebase.firebaseUserInfo &&
                                        <li className={window.location.pathname.toLowerCase() === "/profile" ? "active" : ""}>
                                            <Link to={"/profile"} onClick={this.closeSideNav}>Profile</Link>
                                        </li>
                                    }
                                    {firebase.firebaseUserInfo &&
                                        <li>
                                            <a id='signOffButton' onClick={this.signOutOnClick} className="signOffButton waves-effect waves-light btn" href="#!">Sign Off</a>
                                        </li>
                                    }
                                </ul>

                                {this.state.goHome &&
                                    <Redirect to="/" push={true} />
                                }
                            </div>
                        );

                    }
                }

            </FirebaseContext.Consumer>
        );

    }
}



export default Nav;
