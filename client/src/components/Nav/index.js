import React from 'react';
import { Link } from "react-router-dom";
import './style.css';
import * as FirebaseApp from 'firebase/app';

class Nav extends React.Component {

    state = {
        currentUser: null
    };

    sideNavInstance = null;

    componentDidMount = () => {
        //Initialize the nav bar
        const sideNavElement = document.querySelector('.sidenav');
        this.sideNavInstance = window.M.Sidenav.init(sideNavElement);

        //Setup a listener for when the user's login state changes so we can change what is visible on the nav bar
        FirebaseApp.auth().onAuthStateChanged((user) => {

            this.setState({
                currentUser: user
            });
        }, (error) => {
            console.log(error);

            this.setState({
                currentUser: null
            });
        });
    };

    //Method that closes the side nav
    closeSideNav = () => {
        this.sideNavInstance.close();
    };

    //On click handler for the sign out button
    signOutOnClick = () => {
        FirebaseApp.auth().signOut();
        this.closeSideNav();
    };

    render() {
        return (
            <div className="reactNav">
                <div className="navbar-fixed">
                    <nav>
                        <div className="container nav-wrapper">
                            <Link to={"/"} className="brand-logo"><i className="logo"></i> <span id="title-dad">Dad</span><span id="title-overflow">Overflow</span></Link>
                            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                            <ul className="right hide-on-med-and-down">
                                <li className={window.location.pathname.toLowerCase() === "/" ? "active" : ""}>
                                    <Link to={"/"}>Forum</Link>
                                </li>
                                <li className={window.location.pathname.toLowerCase() === "/todo" ? "active" : ""}>
                                    <Link to={"/todo"}>To Do</Link>
                                </li>
                                {!this.state.currentUser &&
                                    <li className={`loginLink ${window.location.pathname.toLowerCase() === "/login" ? "active" : ""}`}>
                                        <Link className="waves-effect waves-light btn" to={"/login"}>Login</Link>
                                    </li>
                                }
                                {this.state.currentUser &&
                                    <li>
                                        <button onClick={this.signOutOnClick} className="signOffButton waves-effect waves-light btn">Sign Off</button>
                                    </li>
                                }
                            </ul>
                        </div>
                    </nav>

                </div>

                <ul className="sidenav" id="mobile-demo">
                    <li className={window.location.pathname.toLowerCase() === "/" ? "active" : ""}>
                        <Link to={"/"} onClick={this.closeSideNav}>Forum</Link>
                    </li>
                    <li className={window.location.pathname.toLowerCase() === "/todo" ? "active" : ""}>
                        <Link to={"/todo"} onClick={this.closeSideNav}>To Do</Link>
                    </li>
                    {!this.state.currentUser &&
                        <li className={window.location.pathname.toLowerCase() === "/login" ? "active" : ""}>
                            <Link className="waves-effect waves-light btn" to={"/login"} onClick={this.closeSideNav}>Login</Link>
                        </li>
                    }
                    {this.state.currentUser &&
                        <li>
                            <a onClick={this.signOutOnClick} className="signOffButton waves-effect waves-light btn" href="#!">Sign Off</a>
                        </li>
                    }
                </ul>

            </div>
        );
    }
}



export default Nav;
