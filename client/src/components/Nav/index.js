import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

class Nav extends React.Component {

    sideNavInstance;

    componentDidMount = () => {
        //Initialize the nav bar
        const sideNavElement = document.querySelector('.sidenav');
        this.sideNavInstance = window.M.Sidenav.init(sideNavElement);
    };

    //Method that closes the side nav
    closeSideNav = () => {
        this.sideNavInstance.close();
    };

    render() {
        return (
            <div className="reactNav">
                <div className="navbar-fixed">

                    <nav>
                        <div className="nav-wrapper">
                            <Link to={"/"} className="brand-logo"><i className="logo"></i> Dad Overflow</Link>
                            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                            <ul className="right hide-on-med-and-down">
                                <li className={window.location.pathname.toLowerCase() === "/" ? "active" : ""}>
                                    <Link to={"/"}>Forum</Link>
                                </li>
                                <li className={window.location.pathname.toLowerCase() === "/todo" ? "active" : ""}>
                                    <Link to={"/todo"}>To Do</Link>
                                </li>
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
                </ul>

            </div>
        );
    }
}



export default Nav;
