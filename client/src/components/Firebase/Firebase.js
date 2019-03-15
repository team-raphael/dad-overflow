import * as FirebaseApp from 'firebase/app';
import * as Firebaseui from 'firebaseui';

//Set the firebase configuration info
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
};

class Firebase {
    constructor() {
        // Initialize the firebase app
        FirebaseApp.initializeApp(config);

        // Initialize the FirebaseUI Widget using Firebase.
        this.authUI = new Firebaseui.auth.AuthUI(FirebaseApp.auth());
    }

    //Method to start the rendering of the authentication UI in the provided css selector
    startAuthUI = (cssSelector, uiConfig) => {

        if (!uiConfig) {
            uiConfig = {
                signInSuccessUrl: '/',
                signInOptions: [
                    FirebaseApp.auth.EmailAuthProvider.PROVIDER_ID
                ],
                // callbacks: {
                //     uiShown: function () {
                //         document.querySelectorAll('.firebaseui-button')
                //             .forEach(element => element.classList.add("btn"));
                //     }
                // }
            };
        }

        this.authUI.start(cssSelector, uiConfig);
    }

}


export default Firebase;