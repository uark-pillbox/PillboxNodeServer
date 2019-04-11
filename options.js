
//OpenFDA options object for https call
var testOpenFDA_options = {
    host: "api.fda.gov",
    port: 443,
    path: '/drug/ndc.json?search=brand_name:"advil"&limit=1',
    method: 'GET'
};

//RxNorm options object for https call
var testRxNorm_options = {
    host: "rxnav.nlm.nih.gov",
    port: 443,
    path: "/REST/rxcui?name=lipitor",
    method: 'GET'
};

function getRXID_options() {
    return opts = {
    host: "rxnav.nlm.nih.gov",
    port: 443,
    methodL: 'GET',
    path: ''
    }
}

function getInteractions_options() {
    return opts = {
        host: "rxnav.nlm.nih.gov",
        port: 443,
        methodL: 'GET',
        path: '/REST/interaction/list.json?rxcuis=' //Will need to add list of drugs to this path when processing
        }
}

//Exposing options objects
module.exports = {
    testOpenFDA_options,
    testRxNorm_options,
    getRXID_options,
    getInteractions_options
}
