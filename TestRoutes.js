var https = require("https");
var http = require("http");
var options = require("./options.js");
var xml2js = require("xml2js");
var util = require("util");

TestOpenFDA = function (){
    https.get(options.testOpenFDA_options, function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            console.log("Response: "+chunk);
            return chunk;
        });
    }).on('error', (e) => {
        console.error('Got error: '+e.message);
    });
};

TestRxNorm = function (){
    https.get(options.testRxNorm_options, function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            console.log("Response: "+chunk);
            return chunk;
        });
    }).on('error', (e) => {
        console.error('Got error: '+e.message);
    });
}

//Exporting functions to be called in other files
module.exports = {
    TestOpenFDA,
    TestRxNorm
};