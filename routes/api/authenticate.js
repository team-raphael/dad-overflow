const firebaseAdmin = require('firebase-admin');

module.exports = function (req, res, next) {

    let userAccessToken;
    if (req.headers.authorization &&
        req.headers.authorization.split(' ').length >= 2) {
        userAccessToken = req.headers.authorization.split(' ')[1];
    }

    if (userAccessToken) {
        firebaseAdmin.auth().verifyIdToken(userAccessToken)
            .then(decodedToken => {
                var uid = decodedToken.uid;
                next();
            }).catch(error => {
                console.log("error: ", error);
                res.status(401).send();                
            });
    } else {
        res.status(401).send();
    }
};
