import React from 'react';
import './style.css';

class LockScreen extends React.Component {

    state = {
        message: "Loading"
    }

    //Function to lock the screen
    lock = (message = "Loading") => {
        this.setState({
            message: message
        });

        document.getElementsByTagName("body")[0].style["overflow"] = "hidden";
        document.getElementById(this.props.id).style["display"] = "flex";

    }

    //Function to unlock the screen
    unlock = () => {
        document.getElementsByTagName("body")[0].style["overflow"] = "unset";
        document.getElementById(this.props.id).style["display"] = "none";
    }

    //Render the html
    render() {
        return (
            <div id={this.props.id} className="lockScreen">
                <div>
                    { this.state.message }
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            </div>
        );
    }
};

export default LockScreen;
