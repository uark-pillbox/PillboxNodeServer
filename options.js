
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

//Exposing options objects
module.exports = {
    testOpenFDA_options,
    testRxNorm_options
}