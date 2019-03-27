import * as FirebaseApp from 'firebase/app';
import * as Firebaseui from 'firebaseui';
import API from '../../services/APIService';

//Set the firebase configuration info
const config = {
    apiKey: "AIzaSyCgeYH7lMrR0u63G8RojJG1STnb5wReN4w",
    authDomain: "dad-overflow.firebaseapp.com",
    databaseURL: "https://dad-overflow.firebaseio.com",
    projectId: "dad-overflow",
    storageBucket: "dad-overflow.appspot.com",
    messagingSenderId: "642793428247"
};

class Firebase {
    constructor() {
        // Initialize the firebase app
        FirebaseApp.initializeApp(config);

        // Initialize the FirebaseUI Widget using Firebase.
        this.authUI = new Firebaseui.auth.AuthUI(FirebaseApp.auth());

        this.firebaseUserInfo = null;
        this.dbUserInfo = null;
    }

    //Method to start the rendering of the authentication UI in the provided css selector
    startAuthUI = (cssSelector, onRedirectCallBack) => {

        const uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                FirebaseApp.auth.EmailAuthProvider.PROVIDER_ID,
                {
                    provider: FirebaseApp.auth.GoogleAuthProvider.PROVIDER_ID,
                    customParameters: {
                        // Forces account selection even when one account
                        // is available.
                        prompt: 'select_account'
                    }
                },
                FirebaseApp.auth.FacebookAuthProvider.PROVIDER_ID,
                FirebaseApp.auth.TwitterAuthProvider.PROVIDER_ID
            ],
            credentialHelper: Firebaseui.auth.CredentialHelper.NONE,
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => this.signInSuccessful(authResult, redirectUrl, onRedirectCallBack)
            }
        };

        this.authUI.start(cssSelector, uiConfig);
    }

    signInSuccessful = (authResult, redirectUrl, onRedirectCallBack) => {
        if (authResult.user.email) {
            //Save the user to the database if they don't already exist there
            API.getUserByEmail(authResult.user.email)
                .then(user => {
                    if (!user.data || user.data.length === 0) {

                        const newUser = {
                            email: authResult.user.email,
                            displayName: authResult.user.displayName
                        }
                        API.createUser(newUser)
                            .catch((err) => console.log("Error saving user to database: ", err))
                            .finally(() => {
                                window.location.href = "/profile";
                                return false;
                            });
                    } else {
                        if (onRedirectCallBack) {
                            onRedirectCallBack();
                        } else {
                            window.location.href = "/";
                        }
                    }
                })
                .catch(err => {
                    console.log("Error getting user from database: ", err);
                    window.location.href = "/";
                });
        } else {
            window.M.toast({ html: 'Email not obtained from firebase authentication!' });
        }

        return false;
    }

}


export default Firebase;