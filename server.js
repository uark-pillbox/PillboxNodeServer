var path = require('rootpath')();
var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var path = require('path');
var testRoutes = require('./routes/TestRoutes.js');
var xml = require("xml");
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('./_helpers/jwt');
var errorHandler = require('_helpers/error-handling')



var server = express();
server.use(expressValidator());

//Must be set for sever to listen
var port = process.argv[2];
var branch = "";
if(process.argv[4] != null){
    var branch = '/' + process.argv[4];
}
//Body Parser Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));

server.use(cors());

//JWT Authentication for the api
server.use(jwt());

//Users Routes
server.use('/users', require('./users/user.controller'));

//Drug Routes
server.use('/drugs', require('./drugs/drug.controller'));

//Register route

//Test Route for OpenFDA Api will output to Console
server.get('/TestOpenFDA', function(req, res){

    //Asynchronously prossesses the response from OpenFDA
    //POSTMAN GET will return JSON response
    testRoutes.TestOpenFDA().then(resolve => {
        res.send(resolve);
    });
});

//Test Route for RxNorm Api will output to Console
server.get('/TestRxNorm', function(req, res){

    //Asynchronously prossesses the response from OpenFDA
    //POSTMAN GET will return JSON response
    testRoutes.TestRxNorm().then(resolve => {
        res.send(resolve);
    });
});

//Server Runing and Listening on Command argument port
server.listen(port, function(){
    console.log("Server running on port "+port+"...");
});