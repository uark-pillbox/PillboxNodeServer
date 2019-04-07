const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const drugRoute = require('../routes/drugRoutes');
const drugModel = require('../models/drug.model');
const User = db.User;

module.exports = {
    addDrug
}

async function addDrug(id,drugObject) {

    completeDrug = new drugModel.Drug(); //create a new drug from constructor
    
    completeDrug.name = drugObject.name; //get name from what was sent for the app

    currentUser = await User.findById(id).select('-hash'); //get the current user sending the payload from their unique hash

    drugPayload = await drugRoute.getRXID(drugObject.name); //Use api route, send the name of the drug and get the RXnorm ID.
    
    console.log(drugPayload);

    drugPayload = JSON.parse(drugPayload);

    completeDrug.rxnormID = drugPayload.rxnormdata.idGroup.rxnormId._text; //set the drug rxid.

    completeDrug.schedule = drugObject.schedule; //get schedule from the app side.

    currentUser.drugs.push(completeDrug); //update user object
    await currentUser.save(); //save back to the db
    return currentUser;
}