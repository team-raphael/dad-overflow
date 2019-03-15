import * as FirebaseApp from 'firebase/app';
import * as Firebaseui from 'firebaseui';

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