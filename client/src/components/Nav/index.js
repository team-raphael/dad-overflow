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

                    <nav className="white">
                        <div className="nav-wrapper">
                            <Link to={"/"} className="brand-logo"><i className="bookLogo"></i> Book Search</Link>
                            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                            <ul className="right hide-on-med-and-down">
                                <li className={window.location.pathname.toLowerCase() !== "/saved" ? "active" : ""}>
                                    <Link to={"/"}>Search</Link>
                                </li>
                                <li className={window.location.pathname.toLowerCase() === "/saved" ? "active" : ""}>
                                    <Link to={"/saved"}>Saved</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                </div>

                <ul className="sidenav" id="mobile-demo">
                    <li className={window.location.pathname.toLowerCase() !== "/saved" ? "active" : ""}>
                        <Link to={"/"} onClick={this.closeSideNav}>Search</Link>
                    </li>
                    <li className={window.location.pathname.toLowerCase() === "/saved" ? "active" : ""}>
                        <Link to={"/saved"} onClick={this.closeSideNav}>Saved</Link>
                    </li>
                </ul>

            </div>
        );
    }
}



export default Nav;
