const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const drugRoute = require('../routes/drugRoutes');
const drugModel = require('../models/drug.model');
const interactionModel = require('../models/Interaction.model');
const User = db.User;

module.exports = {
    addDrug,
    removeDrug,
    updateDrugSchedule,
    drugInteractions
}

async function addDrug(id,drugObject) {

    completeDrug = new drugModel.Drug(); //create a new drug from constructor
    
    completeDrug.name = drugObject.name.toLowerCase(); //get name from what was sent for the app

    currentUser = await User.findById(id).select('-hash'); //get the current user sending the payload from their unique hash

    drugPayload = await drugRoute.getRXID(drugObject.name); //Use api route, send the name of the drug and get the RXnorm ID.

    drugPayload = JSON.parse(drugPayload);

    completeDrug.rxnormID = drugPayload.rxnormdata.idGroup.rxnormId._text; //set the drug rxid.
    completeDrug.schedule = drugObject.schedule; //get schedule from the app side.

    //Check if drugName is already saved with the User
    if(!drugNameArrayCheck(currentUser.drugs, completeDrug.name)) {
        currentUser.drugs.push(completeDrug); //update user object
    } else {
        throw "Drug with name "+ completeDrug.name + " is already stored."
    }

    await currentUser.save(); //save back to the db
    return currentUser;
}


async function removeDrug(id, drugNameToRemove) {

    var drugFound = false;

    currentUser = await User.findById(id).select('-hash');

    userDrugs = currentUser.drugs;

    userDrugs.forEach((value, index, array) => {
        if(value.name == drugNameToRemove){
            array.splice(index, 1);
            drugFound = true;
        }
    });

    currentUser.drugs = userDrugs;

    if(drugFound){
        await currentUser.save();
    } else {
        throw "Drug "+ drugNameToRemove + " not found listed.";
    }

    return currentUser;
}

async function updateDrugSchedule(id, drugScheduleObject) {

    drugName = drugScheduleObject.name;
    newSchedule = drugScheduleObject.schedule;

    currentUser = await User.findById(id).select('-hash');

    userDrugs = currentUser.drugs;

    var drugToUpdate;
    if(drugNameArrayCheck(userDrugs, drugName)){
        userDrugs.forEach((value, index, array) => {
            if(value.name == drugName)
                drugToUpdate = value;
        });
    } else {
        throw "No Drug named " + drugName + " to update.";
    }

    while(drugToUpdate.schedule.length > 0)
        drugToUpdate.schedule.pop();

    newSchedule.forEach((value, index, array) => {
        drugToUpdate.schedule.push(value);
    });

    userDrugs.forEach((value, index, array) => {
        if(value.name == drugName)
            userDrugs.splice(index, 1, drugToUpdate);
    });

    currentUser.drugs = userDrugs;

    await currentUser.save();
    return currentUser;
}

async function drugInteractions(id){

    currentUser = await User.findById(id).select('-hash');

    userDrugs = currentUser.drugs;

    if(userDrugs.length <= 1 || userDrugs == undefined)
        throw "Not enough drugs listed to check interactions.";

    var drugList = ''
    userDrugs.map((value, index, array) => {
        drugList  += value.rxnormID + '+';
    });

    interactionPayload = await drugRoute.getInteractionObject(drugList);

    //console.log(interactionPayload.fullInteractionTypeGroup[0].fullInteractionType);

    if(interactionPayload.fullInteractionTypeGroup == undefined || interactionPayload.fullInteractionTypeGroup.length < 1)
        throw "No interactions were found from the listed drugs.";

    var interactions = [];
    id = 0;
    interactionPayload.fullInteractionTypeGroup[0].fullInteractionType.map((value, index, array) => {
        interaction = new interactionModel.Interaction();
        interaction.Id = id;
        interaction.DrugName1 = value.minConcept[0].name;
        interaction.DrugName2 = value.minConcept[1].name;

        id += 1;
        interaction.Description = value.interactionPair[0].description;
        interactions.push(interaction);
    });

    return interactions;
}

//function for iterating array of drug objects
//returns TRUE if and object with drugName is found in the array
//returns FALSE if array length is less than 1 or array is undefined
//returns FALSE if a drugObject with the given drugName is not found
function drugNameArrayCheck(drugArray, drugName){
    var check = true;

    if(drugArray.length < 1 || drugArray == undefined)
        check = false;
    
    if(check) { 
        check = false;
        drugArray.map((value, index, array) => {
            if(value.name == drugName)
                check = true;
        });
    }
    return check;
}