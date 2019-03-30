import React from 'react';
import './style.css';

class Searchbar extends React.Component {

    state = {
        search: ""
    };

    onSearchSubmit = (event) => {
        event.preventDefault();
        
        const propsOnSearchSubmit = this.props.onSearchSubmit;

        if (propsOnSearchSubmit) {
            propsOnSearchSubmit(this.state.search);
        }
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onCloseClick = () => {
        this.setState({
            search: ""
        });

        const propsOnCloseClick = this.props.onCloseClick;

        if (propsOnCloseClick) {
            propsOnCloseClick();
        }
    }

    //Render the html
    render() {
        return (
            <nav id={this.props.id} className="searchbarContainer">
                <div className="nav-wrapper">
                    <form onSubmit={this.onSearchSubmit}>
                        <div className="input-field">
                            <input id="search" type="search" name="search" required value={this.state.search} onChange={this.handleInputChange} />
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons" onClick={this.onCloseClick}>close</i>
                        </div>
                    </form>
                </div>
            </nav>
        );
    }
};

export default Searchbar;