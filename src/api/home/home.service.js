const jwt = require('jsonwebtoken');

async function getAll(req, res, next) {
    return res.json({message: "hello from service..."})
}

module.exports = {
    getAll
}
