const express = require('express');
const router = express.Router();
const drugService = require('./drug.service');

router.post('/add', addDrug);

module.exports = router;

function addDrug(req, res, next) {
    drugService.addDrug(req.user.sub, req.body)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
