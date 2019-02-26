var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var testRoutes = require('./TestRoutes.js');
var xml = require("xml");

var app = express();

//Must be set for sever to listen
var port = process.argv[2];

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static Path
app.use(express.static(path.join(__dirname, 'public')));

//Test Route for OpenFDA Api will output to Console
app.get('/TestOpenFDA', function(req, res){
    //res.json(JSON.parse(test.TestOpenFDA())); NOT WORKING

    //TODO Connect content to webpage

    testRoutes.TestOpenFDA();
    res.sendStatus(200);
});

//Test Route for RxNorm Api will output to Console
app.get('/TestRxNorm', function(req, res){
    //res.set('Content-Type', 'text/xml'); NOT WORKING
    //res.send(xml(test.TestRxNorm()));

    //TODO Connect content to webpage

    testRoutes.TestRxNorm();
    res.sendStatus(200);
});

//Server Runing and Listening on Command argument port
app.listen(port, function(){
    console.log("Server running on port "+port+"...");
});