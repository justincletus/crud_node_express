const express = require('express');
const router = express.Router();
const eventService = require('./event.service');
const {verifyToken} = require('../../data/utils');

// router.post('/events', createEvent);

router.get('/', verifyToken, getEvents)

module.exports = router;

function createEvent(req, res, next) {
    eventService.createEvent(req, res, next);
}

function getEvents(req, res, next) {
    eventService.getEvents(req, res, next);
}
