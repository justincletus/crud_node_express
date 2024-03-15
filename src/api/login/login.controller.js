const express = require('express');
const router = express.Router();
const loginService = require('./login.service');

router.post("/", login);

module.exports = router;

function login (req, res, next) {
    loginService.login(req, res, next)
}

