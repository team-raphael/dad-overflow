import React from 'react';
import './style.css';
import API from '../../services/APIService';
import LockScreen from '../../components/LockScreen';
import FirebaseContext from '../../components/Firebase/context';

class Profile extends React.Component {

    state = {
        displayName: null
    }

    //Function that will require all the images into the code
    requireAll = requireContext => {
        return requireContext.keys().map(requireContext);
    };

    //Get all images that are in the profileIcons folder
    images = this.requireAll(require.context('../../profileIcons', false, /\.(png|jpe?g|svg)$/));

    componentDidMount = () => {
        window.scrollTo(0, 0);
        this.initializeCarousel();
        window.M.updateTextFields();
    }

    componentDidUpdate = () => {
        this.initializeCarousel();
        window.M.updateTextFields();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    initializeCarousel = () => {
        //Initialize the materialize carousel
        var elems = document.querySelectorAll('.carousel');
        window.M.Carousel.init(elems);
        this.profileImageCarouselInstance = window.M.Carousel.getInstance(document.querySelector('#profileImageCarousel'));

        //Set the carousel item image to whatever the user has in the database
        if (this.firebase.dbUserInfo && this.firebase.dbUserInfo.image) {

            document.querySelectorAll('.carousel-item')
                .forEach((carouselItem, index) => {
                    if (carouselItem.firstChild.getAttribute("src") === this.firebase.dbUserInfo.image) {
                        this.profileImageCarouselInstance.set(index);
                    }
                });
        }
    }

    onSubmit = (event) => {
        //Prevent the page from refreshing
        event.preventDefault();

        const profileForm = document.querySelector("#profileForm");
        if (profileForm.checkValidity()) {
            //Get the selected profile image
            const selectedImageElement = document.querySelector('.carousel-item.active > img');
            const selectedImageUrl = selectedImageElement.getAttribute("src");

            //If the user already has a database entry then we'll perform an udpate
            if (this.firebase.dbUserInfo) {
                const updateUser = {
                    image: selectedImageUrl,
                    displayName: this.state.displayName
                }

                //Update the database then redirect the user back to the home screen
                API.updateUser(this.firebase.dbUserInfo._id, updateUser, this.firebase.firebaseUserToken)
                    .then((dbUser) => {
                        this.firebase.dbUserInfo = dbUser.data;
                        //this.props.history.push('/');
                        window.location.href = "/";
                    });
            }
        } else {
            window.M.toast({ html: 'Please enter required fields' });
        }

    }


    render() {

        return (
            <FirebaseContext.Consumer>
                {
                    firebase => {

                        this.firebase = firebase;

                        let displayNameValue = "";

                        if (this.state.displayName !== null) {
                            displayNameValue = this.state.displayName;
                        }
                        else if (this.state.displayName === null && firebase.dbUserInfo) {
                            displayNameValue = firebase.dbUserInfo.displayName;
                        }

                        return (
                            <div className="profilePage white-text">
                                <div className="pageContainer">
                                    <div className="container">
                                        <div className="row center-align">
                                            <h1 id="user-profile-h1">User Profile</h1>
                                        </div>
                                        <div className="row">
                                            <div className="col l2 m1 s0" />
                                            <form id="profileForm" className={`col l8 m10 s12 ${!firebase.dbUserInfo ? "hide" : ""}`} >

                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <input id="profileDisplayName" className="validate" required type="text" name="displayName" pattern="^[a-zA-Z1-9].*" onChange={this.handleInputChange} value={displayNameValue}></input>
                                                        <label htmlFor="profileDisplayName">Display Name</label>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <div id="profileImageCarousel" className="carousel">
                                                            {this.images.map((image, index) =>
                                                                <div key={index} className="carousel-item"><img src={image} alt="Misc Baby" /></div>
                                                            )}
                                                        </div>
                                                        <label htmlFor="profileImageCarousel">Select your profile image:</label>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col s12">
                                                        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.onSubmit}>
                                                            Save<i className="material-icons right">save</i>
                                                        </button>
                                                    </div>
                                                </div>

                                            </form>
                                            <h3 id="noDBUser" className={`row ${firebase.dbUserInfo ? "hide" : ""}`}>User must exist in the database in order to use this page! Please log off and log back in.</h3>
                                        </div>
                                    </div>
                                    <LockScreen id="profilePageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
                                </div>
                            </div>
                        );
                    }
                }

            </FirebaseContext.Consumer>
        );

    }
}

export default Profile;