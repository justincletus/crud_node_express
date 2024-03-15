const sql = require('mssql');
const config = require('../config/config');

const sqlConfig = config.sql;

const dbClient = async () => {
    let pool = null;
    try {
        pool = await sql.connect(sqlConfig)
        pool.on("error", (err) => {
            return `database connection failed ${err}`;
        })
        return pool;
    } catch (error) {
        return `DB connection failed ${error}`        
    }
}

module.exports = dbClient;
