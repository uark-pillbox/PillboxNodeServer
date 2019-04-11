const express = require('express');
const router = express.Router();
const drugService = require('./drug.service');

router.post('/add', addDrug);
router.post('/remove', removeDrug);
router.post('/changeSchedule', updateDrugSchedule);
router.post('/interactions', drugInteractions);

module.exports = router;

function addDrug(req, res, next) {
    drugService.addDrug(req.user.sub, req.body)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function removeDrug(req, res, next) {
    drugService.removeDrug(req.user.sub, req.body.name)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateDrugSchedule(req, res, next) {
    drugService.updateDrugSchedule(req.user.sub, req.body)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function drugInteractions(req, res, next) {
    drugService.drugInteractions(req.user.sub)
        .then(interactions => interactions ? res.json(interactions) : res.sendStatus(404))
        .catch(err => next(err));
}
