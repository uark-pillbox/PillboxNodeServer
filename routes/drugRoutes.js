var https = require("https");
var http = require("http");
var options = require("../options.js");
var xml2js = require("xml2js");
var convert = require("xml-js");
var util = require("util");

function getRXID(drugName){
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
        rxidOpts = new options.getRXID_options();
        rxidOpts.path = '/REST/rxcui?name=' + drugName;
        let request = https.get(rxidOpts, callback);
        request.end();
    });
}

module.exports = {
    getRXID
};