const fse = require('fs-extra')
const {join} = require('path')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const {cookiePwd} = config;

const loadSqlQueries = async folderName => {
    const filePath = await join(process.cwd(), "src", "data", folderName);
    const files = await fse.readdir(filePath);
    const sqlFiles = files.filter(f => f.endsWith(".sql"));

    const queries = {}
    for (let i=0; i < sqlFiles.length; i++) {
        const query = fse.readFileSync(join(filePath, sqlFiles[i]), {encoding: 'utf-8'})
        queries[sqlFiles[i].replace('.sql', '')] = query
    }

    return queries
}

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(403).send({auth: false, message: 'No token Provided'})
    jwt.verify(token, cookiePwd, (err, decoded) => {
        if(err) return res.status(500).send({auth: false, message: 'Falied to authenticate'})
        req.userId = decoded.id;
        next()
    });

}


module.exports = {
    loadSqlQueries,
    hashPassword,
    verifyPassword,
    verifyToken
}