var https = require("https");
var http = require("http");
var options = require("./options.js");
var xml2js = require("xml2js");
var convert = require("xml-js");
var util = require("util");

function TestOpenFDA(){
    return new Promise(resolve => { 
        let obj = '';
        callback = function(res){
            var str = '';
            
            res.on('data', (chunk) => {
                str += chunk;
            });

            res.on('end', () => {
                obj = JSON.parse(str);
                resolve(obj);
            });
        }
        let request = https.get(options.testOpenFDA_options, callback);
        request.end();
    });
};

function TestRxNorm(){
    /*https.get(options.testRxNorm_options, function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            console.log("Response: "+chunk);
            return chunk;
        });
    }).on('error', (e) => {
        console.error('Got error: '+e.message);
    });*/

    return new Promise(resolve => { 
        let obj = '';
        callback = function(res){
            var str = '';
            
            res.on('data', (chunk) => {
                str += chunk;
            });

            res.on('end', () => {
                obj = convert.xml2json(str, {compact: true, spaces: 4});
                resolve(obj);
            });
        }
        let request = https.get(options.testRxNorm_options, callback);
        request.end();
    });
}

//Exporting functions to be called in other files
module.exports = {
    TestOpenFDA,
    TestRxNorm
};