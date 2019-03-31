// Add dependencies
require('dotenv').config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
var http = require("http").Server(app);
const io = require("socket.io")(http);
const firebaseAdmin = require('firebase-admin');
const firebaseServiceAccount = require('./dad-overflow-firebase-adminsdk-uiegk-47747a9fa1');

//Initialize firebase admin
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
  databaseURL: "https://dad-overflow.firebaseio.com"
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/dadOverflow"
);

//Connect to socket io
io.on('connection', function(socket){
  console.log("User connected");
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

http.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
