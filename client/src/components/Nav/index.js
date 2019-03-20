import React from 'react';
import { Link } from "react-router-dom";
import './style.css';
import * as FirebaseApp from 'firebase/app';
import profileBackground from '../../backgroundImage1.jpg';
import FirebaseContext from '../Firebase/context';

class Nav extends React.Component {

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
        window.location.href = "/";
    };

    render() {

        return (
            <FirebaseContext.Consumer>
                {
                    firebase => {

                        return (
                            <div className="reactNav">
                                <div className="navbar-fixed">
                                    <nav>
                                        <div className="container nav-wrapper">
                                            <Link to={"/"} className="brand-logo"><i className="logo"></i> Dad Overflow</Link>
                                            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                                            <ul className="right hide-on-med-and-down">
                                                <li className={window.location.pathname.toLowerCase() === "/" ? "active" : ""}>
                                                    <Link to={"/"}>Forum</Link>
                                                </li>
                                                <li className={window.location.pathname.toLowerCase() === "/todo" ? "active" : ""}>
                                                    <Link to={"/todo"}>To Do</Link>
                                                </li>
                                                {!firebase.firebaseUserInfo &&
                                                    <li className={`loginLink ${window.location.pathname.toLowerCase() === "/login" ? "active" : ""}`}>
                                                        <Link className="waves-effect waves-light btn" to={"/login"}>Login</Link>
                                                    </li>
                                                }
                                                {firebase.firebaseUserInfo &&
                                                    <li>
                                                        <img className="dropdown-trigger profileImage" data-target='profileDropdown' src={(firebase.dbUserInfo && firebase.dbUserInfo.image) ? firebase.dbUserInfo.image : "https://via.placeholder.com/225"} alt="profile"></img>

                                                        <ul id='profileDropdown' className='dropdown-content'>
                                                            <li>
                                                                <Link className="profileLink" to={"/profile"}>Profile</Link>
                                                            </li>
                                                            <li className="divider" tabIndex="-1"></li>
                                                            <li className="noHighlight">
                                                                <button onClick={this.signOutOnClick} className="signOffButton waves-effect waves-light btn">Sign Off</button>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </nav>

                                </div>

                                <ul className="sidenav" id="mobile-demo">
                                    <li>
                                        <div className="user-view">
                                            <div className="background">
                                                <img src={profileBackground} alt="background" />
                                            </div>
                                            <div><img className="circle" data-target='profileDropdown' src={(firebase.dbUserInfo && firebase.dbUserInfo.image) ? firebase.dbUserInfo.image : "https://via.placeholder.com/225"} alt="profile" /></div>
                                            <div><span className="white-text name">{(firebase.firebaseUserInfo && firebase.firebaseUserInfo.displayName) ? firebase.firebaseUserInfo.displayName : ""}</span></div>
                                            <div><span className="white-text email">{(firebase.firebaseUserInfo && firebase.firebaseUserInfo.email) ? firebase.firebaseUserInfo.email : ""}</span></div>
                                        </div>
                                    </li>

                                    <li className={window.location.pathname.toLowerCase() === "/" ? "active" : ""}>
                                        <Link to={"/"} onClick={this.closeSideNav}>Forum</Link>
                                    </li>
                                    <li className={window.location.pathname.toLowerCase() === "/todo" ? "active" : ""}>
                                        <Link to={"/todo"} onClick={this.closeSideNav}>To Do</Link>
                                    </li>
                                    {!firebase.firebaseUserInfo &&
                                        <li className={window.location.pathname.toLowerCase() === "/login" ? "active" : ""}>
                                            <Link className="waves-effect waves-light btn" to={"/login"} onClick={this.closeSideNav}>Login</Link>
                                        </li>
                                    }
                                    {firebase.firebaseUserInfo &&
                                        <li className={window.location.pathname.toLowerCase() === "/profile" ? "active" : ""}>
                                            <Link to={"/profile"} onClick={this.closeSideNav}>Profile</Link>
                                        </li>
                                    }
                                    {firebase.firebaseUserInfo &&
                                        <li>
                                            <a onClick={this.signOutOnClick} className="signOffButton waves-effect waves-light btn" href="#!">Sign Off</a>
                                        </li>
                                    }
                                </ul>

                            </div>
                        );
                    }
                }

            </FirebaseContext.Consumer>
        );

    }
}



export default Nav;
