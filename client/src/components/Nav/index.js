import React from 'react';
import { Link } from "react-router-dom";
import './style.css';
import * as FirebaseApp from 'firebase/app';
import API from '../../services/APIService';

class Nav extends React.Component {

    state = {
        currentUser: null,
        dbUser: null
    };

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

        //Initialize profile drop down
        var elems = document.querySelectorAll('.dropdown-trigger');
        window.M.Dropdown.init(elems);

        //Setup a listener for when the user's login state changes so we can change what is visible on the nav bar
        FirebaseApp.auth().onAuthStateChanged((user) => {

            this.setState({
                currentUser: user
            });

            //Check the database for this user and set the state to that user
            if (user) {
                API.getUserByEmail(user.email)
                    .then(dbUsers => {
                        if (dbUsers.data && dbUsers.data.length > 0) {
                            console.log(dbUsers.data[0].image);
                            this.setState({
                                dbUser: dbUsers.data[0]
                            });
                        } else {
                            this.setState({
                                dbUser: null
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        window.M.toast({ html: 'Error obtaining user from the database!' });
                    });
            }

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
        window.location.href = "/";
    };

    render() {
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
                                {!this.state.currentUser &&
                                    <li className={`loginLink ${window.location.pathname.toLowerCase() === "/login" ? "active" : ""}`}>
                                        <Link className="waves-effect waves-light btn" to={"/login"}>Login</Link>
                                    </li>
                                }
                                {this.state.currentUser &&
                                    <li>
                                        <img className="dropdown-trigger profileImage" data-target='profileDropdown' src={this.state.dbUser ? this.state.dbUser.image : "https://via.placeholder.com/225"} alt="profile"></img>

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
