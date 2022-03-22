// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000; // port number
//listen to 
app.listen(process.env.PORT || port);

// function listening() {
//     console.log(`server is runing on localhost:${port}`);
// }

//GET route that returns the projectData object
app.get('/all', getData);

function getData(req, res) {
    res.send(projectData);
}

//POST route that adds incoming data to projectData
app.post('/add', addData);

function addData(req, res) {
    projectData = {
        name: req.body.name,
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.feelings
    };
}
