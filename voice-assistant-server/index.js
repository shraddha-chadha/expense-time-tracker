/// ENV
const PORT = 3001;                                      // PORT NUMBER

/// APP BOOTSTRAP
const express = require('express');
const app = express();
var bodyParser = require('body-parser')

/// MIDDLEWARE CONFIG
app.use(bodyParser.json());                             // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));    // support encoded bodies


/// IMPORT INTENT HANDLERS
const googleHome = require('./google_home');            // get google intent handlers
const alexa = require('./alexa');                       // get alexa intent handler

// HOME PAGE
app.get('/', (req, res) => {
    res.send("Welcome to the Voice Personal Assistant Server");
});

// ALEXA INTENT HANDLERS
app.post('/alexa', alexa);

// GOOGLE ACTION HANDLERS
app.post('/google', googleHome);

/// START THE SERVER
app.listen(PORT, () => console.log('Voice Assistant Server listening on port ' + PORT));