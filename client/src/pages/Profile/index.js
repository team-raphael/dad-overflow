import React from 'react';
import './style.css';
import API from '../../services/APIService';
import LockScreen from '../../components/LockScreen';
import * as FirebaseApp from 'firebase/app';

class Profile extends React.Component {

    state = {
        userExistsInDB: false
    };

    //Function that will require all the images into the code
    requireAll = requireContext => {
        return requireContext.keys().map(requireContext);
    };

    //Get all images that are in the profileIcons folder
    images = this.requireAll(require.context('../../profileIcons', false, /\.(png|jpe?g|svg)$/));

    componentDidMount = () => {
        //Initialize the materialize carousel
        var elems = document.querySelectorAll('.carousel');
        window.M.Carousel.init(elems);
        this.profileImageCarouselInstance = window.M.Carousel.getInstance(document.querySelector('#profileImageCarousel'));

        //Lock the screen until the firebase authentication has been obtained
        this.lockScreen.lock();

        //Attach on authentication event listener to prepopulate screen data
        FirebaseApp.auth().onAuthStateChanged(this.firebaseAuthenticated);
    }

    firebaseAuthenticated = (user) => {

        if (user) {
            //If the user is in the database already then initialize the screen with values from the database
            API.getUserByEmail(user.email)
                .then(dbUsers => {
                    this.firebaseUserInfo = user;

                    if (dbUsers.data.length > 0) {
                        document.getElementById('profileForm').classList.remove('hide');
                        document.getElementById('noDBUser').classList.add('hide');

                        this.dbUserInfo = dbUsers.data[0];

                        //If the user has an image in the database then set the image on the screen to match
                        const currentUserImage = dbUsers.data[0].image;
                        if (currentUserImage) {

                            document.querySelectorAll('.carousel-item')
                                .forEach((carouselItem, index) => {
                                    if (carouselItem.firstChild.getAttribute("src") === currentUserImage) {
                                        this.profileImageCarouselInstance.set(index);
                                    }
                                });
                        }
                    } else {
                        document.getElementById('profileForm').classList.add('hide');
                        document.getElementById('noDBUser').classList.remove('hide');
                        window.M.toast({ html: "User must exist in the database in order to use this page! Please log off and log back in." });
                    }
                })
                .catch(err => {
                    this.setState({
                        dbUserInfo: null
                    });

                    document.getElementById('profileForm').classList.add('hide');
                    window.M.toast({ html: "Trouble obtaining the user data from the database!" });
                    console.log("Trouble obtaining the user data from the database: ", err);
                })
                .finally(() => {
                    this.lockScreen.unlock();
                });
        }
    }

    onSubmit = (event) => {
        //Prevent the page from refreshing
        event.preventDefault();

        //Get the selected profile image
        const selectedImageElement = document.querySelector('.carousel-item.active > img');
        const selectedImageUrl = selectedImageElement.getAttribute("src");

        //If the user already has a database entry then we'll perform an udpate
        if (this.dbUserInfo) {
            const updateUser = {
                image: selectedImageUrl
            }

            //Update the database then redirect the user back to the home screen
            API.updateUser(this.dbUserInfo._id, updateUser)
                .then(() => {
                    //this.props.history.push('/');
                    window.location.href = "/";
                });
        }
    }

    render() {
        return (

            <div className="profilePage white-text">
                <div className="pageContainer">
                    <div className="container">
                        <div className="row">
                            <h1>User Profile</h1>
                        </div>
                        <div className="row">
                            <form id="profileForm" className="col s12">
                                <div className="row">

                                    <div className="input-field col l4 m6 s12">
                                        <div id="profileImageCarousel" className="carousel">
                                            {this.images.map((image, index) =>
                                                <a key={index} className="carousel-item" href={`#${index}!`}><img src={image} alt="Misc Baby" /></a>
                                            )}
                                        </div>
                                        <label htmlFor="profileImageCarousel">Select your profile image:</label>
                                    </div>

                                </div>
                                <div className="row">
                                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.onSubmit}>Submit
                                                <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </form>
                            <h3 id="noDBUser" className="hide">User must exist in the database in order to use this page! Please log off and log back in.</h3>
                        </div>
                    </div>
                    <LockScreen id="profilePageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
                </div>
            </div>
        )
    }
}

export default Profile;