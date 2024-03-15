const express = require('express');
const router = express.Router();
const homeService = require('./home.service');

module.exports = router;

router.get("/", getAll);

function getAll(req, res, next) {
    homeService.getAll(req, res, next)
}