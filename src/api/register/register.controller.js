const express = require('express')
const router = express.Router()
const registerService = require('./register.service');

router.post('/', createUser);

module.exports = router;


function createUser(req, res, next) {
    registerService.createUser(req, res, next)
}
